import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getRecentActivity } from '../../services/creditService'

const RecentActivity = () => {
  const { user } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getRecentActivity(user.token)
        setActivities(data)
      } catch (err) {
        console.error('Failed to load activities:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadActivities()
  }, [user])

  if (loading) return <div>Loading activities...</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleString()}
                </p>
              </div>
              <div className={`font-semibold ${activity.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {activity.amount > 0 ? '+' : ''}{activity.amount}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  )
}

export default RecentActivity