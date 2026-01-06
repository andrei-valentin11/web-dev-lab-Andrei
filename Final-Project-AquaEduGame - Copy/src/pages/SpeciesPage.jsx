import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Info, Droplet, Thermometer, Waves, Activity, TrendingUp } from 'lucide-react'
import { speciesData } from '../data/speciesData'

const SpeciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState(null)
  const [filterDifficulty, setFilterDifficulty] = useState('all')

  const filteredSpecies = speciesData.filter(species => {
    const matchesSearch = species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      species.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = filterDifficulty === 'all' || species.difficulty === filterDifficulty
    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold gradient-text">Aquaculture Species</h1>
        <p className="text-xl text-gray-600">Explore Philippine Aquaculture Species and Their Requirements</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </motion.div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredSpecies.map((species, index) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedSpecies(species)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="text-6xl mb-4 text-center">{species.image}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{species.name}</h3>
              <p className="text-sm text-gray-500 italic mb-4">{species.scientificName}</p>
              <p className="text-gray-600 mb-4 line-clamp-2">{species.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(species.difficulty)}`}>
                  {species.difficulty}
                </span>
                <span className="text-sm text-gray-500">{species.growthRate}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Species Detail Modal */}
      <AnimatePresence>
        {selectedSpecies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpecies(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-7xl">{selectedSpecies.image}</span>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-800">{selectedSpecies.name}</h2>
                      <p className="text-lg text-gray-500 italic">{selectedSpecies.scientificName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSpecies(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <p className="text-gray-700 mb-8 text-lg">{selectedSpecies.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* pH Level */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Droplet className="text-purple-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">pH Level</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-semibold">{selectedSpecies.phLevel.min} - {selectedSpecies.phLevel.max}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Optimal:</span>
                        <span className="font-bold text-purple-600">{selectedSpecies.phLevel.optimal}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Oxygen Level */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="text-blue-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">Oxygen Level</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-semibold">{selectedSpecies.oxygenLevel.min} - {selectedSpecies.oxygenLevel.max} {selectedSpecies.oxygenLevel.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Optimal:</span>
                        <span className="font-bold text-blue-600">{selectedSpecies.oxygenLevel.optimal} {selectedSpecies.oxygenLevel.unit}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Temperature */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Thermometer className="text-orange-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">Temperature</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-semibold">{selectedSpecies.temperature.min} - {selectedSpecies.temperature.max} {selectedSpecies.temperature.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Optimal:</span>
                        <span className="font-bold text-orange-600">{selectedSpecies.temperature.optimal} {selectedSpecies.temperature.unit}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Water Depth */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Waves className="text-cyan-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">Water Depth</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-semibold">{selectedSpecies.waterDepth.min} - {selectedSpecies.waterDepth.max} {selectedSpecies.waterDepth.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Optimal:</span>
                        <span className="font-bold text-cyan-600">{selectedSpecies.waterDepth.optimal} {selectedSpecies.waterDepth.unit}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Salinity</h3>
                    <p className="text-gray-600">
                      Range: {selectedSpecies.salinity.min} - {selectedSpecies.salinity.max} {selectedSpecies.salinity.unit}
                    </p>
                    <p className="text-gray-600">
                      Optimal: <span className="font-bold">{selectedSpecies.salinity.optimal} {selectedSpecies.salinity.unit}</span>
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Feeding</h3>
                    <p className="text-gray-600">{selectedSpecies.feeding}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full font-semibold ${getDifficultyColor(selectedSpecies.difficulty)}`}>
                    Difficulty: {selectedSpecies.difficulty}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <TrendingUp size={20} />
                    <span>{selectedSpecies.growthRate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpeciesPage

