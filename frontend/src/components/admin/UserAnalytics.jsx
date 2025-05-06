import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { getUsersAnalytics } from '../../services/authService.js'

const UserAnalytics = () => {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getUsersAnalytics(user.token)
        setAnalytics(data)
      } catch (err) {
        console.error('Failed to load analytics:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadAnalytics()
  }, [user])

  if (loading) return <div>Loading analytics...</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">User Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{analytics.totalUsers}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Active Today</p>
          <p className="text-2xl font-bold">{analytics.activeToday}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">New This Week</p>
          <p className="text-2xl font-bold">{analytics.newThisWeek}</p>
        </div>
      </div>
    </div>
  )
}

export default UserAnalytics