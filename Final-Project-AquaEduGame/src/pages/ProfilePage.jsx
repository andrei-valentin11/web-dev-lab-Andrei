import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, GraduationCap, Calendar, Edit2, Save, X, Award, TrendingUp, Target, Clock } from 'lucide-react'

const ProfilePage = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    role: user?.role || 'student'
  })

  const handleSave = () => {
    const updatedUser = { ...user, ...editData }
    setUser(updatedUser)
    localStorage.setItem('aquaEduUser', JSON.stringify(updatedUser))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      studentId: user?.studentId || '',
      role: user?.role || 'student'
    })
    setIsEditing(false)
  }

  const stats = [
    { icon: Target, label: 'Species Mastered', value: '4/6', color: 'blue' },
    { icon: TrendingUp, label: 'Average Score', value: '85%', color: 'green' },
    { icon: Clock, label: 'Total Time', value: '6h 30m', color: 'purple' },
    { icon: Award, label: 'Achievements', value: '12', color: 'orange' },
  ]

  const recentActivity = [
    { action: 'Completed Tilapia simulation', time: '2 hours ago', score: 95 },
    { action: 'Learned about Bangus species', time: '1 day ago', score: null },
    { action: 'Achieved perfect pH control', time: '2 days ago', score: 100 },
    { action: 'Completed Shrimp simulation', time: '3 days ago', score: 88 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold gradient-text">My Profile</h1>
        <p className="text-xl text-gray-600">Manage your account and view your progress</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl text-white"
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </motion.div>
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.name || 'Student'}</h2>
                  <p className="text-gray-600 mb-1">{user?.email || 'No email'}</p>
                  <p className="text-sm text-gray-500 mb-4">{user?.studentId || 'No ID'}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
                  >
                    <Edit2 size={18} />
                    <span>Edit Profile</span>
                  </motion.button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input
                      type="text"
                      value={editData.studentId}
                      onChange={(e) => setEditData({ ...editData, studentId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <Save size={18} />
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <X size={18} />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <GraduationCap size={20} />
                <span className="capitalize">{user?.role || 'student'}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar size={20} />
                <span>Joined {new Date(user?.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Award size={20} />
                <span>Level {user?.level || 1}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl shadow-lg p-6 text-white`}
                >
                  <Icon className="mb-3" size={28} />
                  <p className="text-blue-100 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  {activity.score && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                      {activity.score}%
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Learning Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Overall Progress</span>
                  <span className="font-bold">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '68%' }}
                    transition={{ duration: 1 }}
                    className="bg-white h-3 rounded-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-blue-100 text-sm">Species Learned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-blue-100 text-sm">Sessions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-blue-100 text-sm">Avg Score</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

