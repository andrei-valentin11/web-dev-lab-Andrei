import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Target, Clock, BarChart3, PieChart, Activity, Trophy } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AnalyticsPage = ({ user }) => {
  const [timeRange, setTimeRange] = useState('week')
  const [stats, setStats] = useState({
    totalSessions: 24,
    totalTime: 360,
    averageScore: 85,
    speciesCompleted: 4,
    currentStreak: 7,
    bestScore: 98
  })

  // Mock data for charts
  const performanceData = [
    { name: 'Mon', score: 75, time: 45 },
    { name: 'Tue', score: 82, time: 50 },
    { name: 'Wed', score: 88, time: 55 },
    { name: 'Thu', score: 85, time: 48 },
    { name: 'Fri', score: 92, time: 60 },
    { name: 'Sat', score: 90, time: 58 },
    { name: 'Sun', score: 95, time: 65 },
  ]

  const speciesProgress = [
    { name: 'Tilapia', progress: 100, color: '#3b82f6' },
    { name: 'Bangus', progress: 85, color: '#06b6d4' },
    { name: 'Shrimp', progress: 60, color: '#8b5cf6' },
    { name: 'Crab', progress: 45, color: '#f59e0b' },
    { name: 'Seaweed', progress: 30, color: '#10b981' },
    { name: 'Grouper', progress: 15, color: '#ef4444' },
  ]

  const skillDistribution = [
    { name: 'pH Management', value: 92, color: '#3b82f6' },
    { name: 'Temperature Control', value: 88, color: '#06b6d4' },
    { name: 'Oxygen Monitoring', value: 85, color: '#8b5cf6' },
    { name: 'Water Depth', value: 78, color: '#f59e0b' },
  ]

  const achievements = [
    { icon: '🏆', title: 'Master Caretaker', desc: 'Maintained 100% health for 10 minutes', earned: true },
    { icon: '⭐', title: 'Perfect Week', desc: 'Completed 7 days in a row', earned: true },
    { icon: '🎯', title: 'Species Expert', desc: 'Mastered 3 different species', earned: true },
    { icon: '🔥', title: 'Hot Streak', desc: '10 consecutive perfect sessions', earned: false },
    { icon: '💎', title: 'Diamond Caretaker', desc: 'Achieved 100% score 5 times', earned: false },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl font-bold gradient-text">Analytics & Insights</h1>
          <p className="text-xl text-gray-600 mt-2">Track your learning progress and performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Activity, label: 'Total Sessions', value: stats.totalSessions, color: 'blue' },
          { icon: Clock, label: 'Total Time', value: `${Math.floor(stats.totalTime / 60)}h ${stats.totalTime % 60}m`, color: 'cyan' },
          { icon: TrendingUp, label: 'Average Score', value: `${stats.averageScore}%`, color: 'purple' },
          { icon: Target, label: 'Species Completed', value: `${stats.speciesCompleted}/6`, color: 'orange' },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl shadow-lg p-6 text-white`}
            >
              <Icon className="mb-4" size={32} />
              <p className="text-blue-100 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <BarChart3 size={24} />
              <span>Performance Trend</span>
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} name="Score (%)" />
              <Line type="monotone" dataKey="time" stroke="#06b6d4" strokeWidth={3} name="Time (min)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skill Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <PieChart size={24} />
              <span>Skill Distribution</span>
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {skillDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Species Progress & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Species Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Target size={24} />
            <span>Species Progress</span>
          </h2>
          <div className="space-y-4">
            {speciesProgress.map((species, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">{species.name}</span>
                  <span className="text-gray-600">{species.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${species.progress}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: species.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Trophy size={24} />
            <span>Achievements</span>
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border-2 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h3 className={`font-bold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.desc}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Award className="text-yellow-500" size={24} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-8 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{stats.currentStreak}</div>
            <p className="text-blue-100">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{stats.bestScore}%</div>
            <p className="text-blue-100">Best Score</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{stats.speciesCompleted}</div>
            <p className="text-blue-100">Species Mastered</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsPage

