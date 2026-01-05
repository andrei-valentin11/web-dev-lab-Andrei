import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, AlertCircle, CheckCircle, TrendingUp, Droplet, Thermometer, Waves, Activity } from 'lucide-react'
import { speciesData } from '../data/speciesData'

const SimulatorPage = ({ user }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [parameters, setParameters] = useState({
    ph: 7.0,
    temperature: 26,
    waterDepth: 1.5,
    oxygen: 6.0
  })
  const [health, setHealth] = useState(100)
  const [score, setScore] = useState(0)
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    let interval = null
    if (isRunning && selectedSpecies) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
        calculateHealth()
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, selectedSpecies, parameters])

  const calculateHealth = () => {
    if (!selectedSpecies) return

    let healthScore = 100
    const newAlerts = []

    // Check pH
    if (parameters.ph < selectedSpecies.phLevel.min || parameters.ph > selectedSpecies.phLevel.max) {
      healthScore -= 15
      newAlerts.push({ type: 'error', message: `pH level is out of range! Optimal: ${selectedSpecies.phLevel.optimal}` })
    } else if (Math.abs(parameters.ph - selectedSpecies.phLevel.optimal) > 0.5) {
      healthScore -= 5
      newAlerts.push({ type: 'warning', message: `pH level is not optimal. Target: ${selectedSpecies.phLevel.optimal}` })
    }

    // Check Temperature
    if (parameters.temperature < selectedSpecies.temperature.min || parameters.temperature > selectedSpecies.temperature.max) {
      healthScore -= 15
      newAlerts.push({ type: 'error', message: `Temperature is out of range! Optimal: ${selectedSpecies.temperature.optimal}°C` })
    } else if (Math.abs(parameters.temperature - selectedSpecies.temperature.optimal) > 2) {
      healthScore -= 5
      newAlerts.push({ type: 'warning', message: `Temperature is not optimal. Target: ${selectedSpecies.temperature.optimal}°C` })
    }

    // Check Water Depth
    if (parameters.waterDepth < selectedSpecies.waterDepth.min || parameters.waterDepth > selectedSpecies.waterDepth.max) {
      healthScore -= 10
      newAlerts.push({ type: 'error', message: `Water depth is out of range! Optimal: ${selectedSpecies.waterDepth.optimal}m` })
    } else if (Math.abs(parameters.waterDepth - selectedSpecies.waterDepth.optimal) > 0.3) {
      healthScore -= 3
      newAlerts.push({ type: 'warning', message: `Water depth is not optimal. Target: ${selectedSpecies.waterDepth.optimal}m` })
    }

    // Check Oxygen
    if (parameters.oxygen < selectedSpecies.oxygenLevel.min || parameters.oxygen > selectedSpecies.oxygenLevel.max) {
      healthScore -= 15
      newAlerts.push({ type: 'error', message: `Oxygen level is out of range! Optimal: ${selectedSpecies.oxygenLevel.optimal} mg/L` })
    } else if (Math.abs(parameters.oxygen - selectedSpecies.oxygenLevel.optimal) > 1) {
      healthScore -= 5
      newAlerts.push({ type: 'warning', message: `Oxygen level is not optimal. Target: ${selectedSpecies.oxygenLevel.optimal} mg/L` })
    }

    // All parameters optimal
    if (healthScore >= 95) {
      setScore(prev => prev + 1)
    }

    setHealth(Math.max(0, Math.min(100, healthScore)))
    setAlerts(newAlerts.slice(0, 3))
  }

  const handleStart = () => {
    if (!selectedSpecies) {
      alert('Please select a species first!')
      return
    }
    setIsRunning(true)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setHealth(100)
    setScore(0)
    setAlerts([])
    if (selectedSpecies) {
      setParameters({
        ph: selectedSpecies.phLevel.optimal,
        temperature: selectedSpecies.temperature.optimal,
        waterDepth: selectedSpecies.waterDepth.optimal,
        oxygen: selectedSpecies.oxygenLevel.optimal
      })
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getHealthColor = () => {
    if (health >= 80) return 'text-green-600'
    if (health >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold gradient-text">Aquaculture Simulator</h1>
        <p className="text-xl text-gray-600">Practice caring for aquatic species by managing water parameters</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Species Selection & Controls */}
        <div className="space-y-6">
          {/* Species Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Species</h2>
            <div className="space-y-3">
              {speciesData.map((species) => (
                <motion.button
                  key={species.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSpecies(species)
                    setParameters({
                      ph: species.phLevel.optimal,
                      temperature: species.temperature.optimal,
                      waterDepth: species.waterDepth.optimal,
                      oxygen: species.oxygenLevel.optimal
                    })
                    handleReset()
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedSpecies?.id === species.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{species.image}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{species.name}</h3>
                      <p className="text-sm text-gray-500">{species.difficulty}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Controls</h2>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                disabled={!selectedSpecies || isRunning}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-300 flex items-center justify-center space-x-2"
              >
                <Play size={20} />
                <span>Start</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-300 flex items-center justify-center space-x-2"
              >
                <Pause size={20} />
                <span>Pause</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>Reset</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Time</span>
                  <span className="font-bold">{formatTime(time)}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Score</span>
                  <span className="font-bold text-blue-600">{score}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Health</span>
                  <span className={`font-bold ${getHealthColor()}`}>{health.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full ${
                      health >= 80 ? 'bg-green-500' : health >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${health}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center - Simulator Display */}
        <div className="lg:col-span-2 space-y-6">
          {selectedSpecies ? (
            <>
              {/* Species Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-7xl animate-float">{selectedSpecies.image}</span>
                      <div>
                        <h2 className="text-4xl font-bold">{selectedSpecies.name}</h2>
                        <p className="text-blue-100">{selectedSpecies.scientificName}</p>
                      </div>
                    </div>
                    <div className={`text-6xl font-bold ${getHealthColor()}`}>
                      {health.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Parameter Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Water Parameters</h2>

                {/* pH Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Droplet className="text-purple-600" size={20} />
                      <span className="font-semibold text-gray-700">pH Level</span>
                    </div>
                    <span className="text-gray-600">
                      {parameters.ph.toFixed(1)} (Optimal: {selectedSpecies.phLevel.optimal})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedSpecies.phLevel.min - 1}
                    max={selectedSpecies.phLevel.max + 1}
                    step={0.1}
                    value={parameters.ph}
                    onChange={(e) => setParameters({ ...parameters, ph: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Temperature */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="text-orange-600" size={20} />
                      <span className="font-semibold text-gray-700">Temperature</span>
                    </div>
                    <span className="text-gray-600">
                      {parameters.temperature}°C (Optimal: {selectedSpecies.temperature.optimal}°C)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedSpecies.temperature.min - 5}
                    max={selectedSpecies.temperature.max + 5}
                    step={0.5}
                    value={parameters.temperature}
                    onChange={(e) => setParameters({ ...parameters, temperature: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Water Depth */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Waves className="text-cyan-600" size={20} />
                      <span className="font-semibold text-gray-700">Water Depth</span>
                    </div>
                    <span className="text-gray-600">
                      {parameters.waterDepth.toFixed(1)}m (Optimal: {selectedSpecies.waterDepth.optimal}m)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedSpecies.waterDepth.min - 0.5}
                    max={selectedSpecies.waterDepth.max + 0.5}
                    step={0.1}
                    value={parameters.waterDepth}
                    onChange={(e) => setParameters({ ...parameters, waterDepth: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Oxygen Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="text-blue-600" size={20} />
                      <span className="font-semibold text-gray-700">Oxygen Level</span>
                    </div>
                    <span className="text-gray-600">
                      {parameters.oxygen.toFixed(1)} mg/L (Optimal: {selectedSpecies.oxygenLevel.optimal} mg/L)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedSpecies.oxygenLevel.min - 2}
                    max={selectedSpecies.oxygenLevel.max + 2}
                    step={0.1}
                    value={parameters.oxygen}
                    onChange={(e) => setParameters({ ...parameters, oxygen: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </motion.div>

              {/* Alerts */}
              {alerts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`p-4 rounded-xl flex items-center space-x-3 ${
                        alert.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                      }`}
                    >
                      {alert.type === 'error' ? (
                        <AlertCircle className="text-red-600" size={24} />
                      ) : (
                        <AlertCircle className="text-yellow-600" size={24} />
                      )}
                      <p className={alert.type === 'error' ? 'text-red-800' : 'text-yellow-800'}>
                        {alert.message}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <div className="text-6xl mb-4">🐟</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a Species</h3>
              <p className="text-gray-600">Choose a species from the left to start the simulator</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimulatorPage

