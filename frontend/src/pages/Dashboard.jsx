import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CreditStats from '../components/dashboard/CreditStats'
import SavedFeeds from '../components/dashboard/SavedFeeds'
import RecentActivity from '../components/dashboard/RecentActivity'
import { getCredits } from '../services/creditService'

const Dashboard = () => {
  const { user } = useAuth()
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const creditsData = await getCredits(user.token)
        setCredits(creditsData)
      } catch (err) {
        console.error('Failed to load credits:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadCredits()
  }, [user])

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.username}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <CreditStats credits={credits} />
        </div>
        <div className="md:col-span-2">
          <RecentActivity />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Saved Content</h2>
        <SavedFeeds />
      </div>
    </div>
  )
}

export default Dashboard