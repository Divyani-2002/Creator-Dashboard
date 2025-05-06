import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { earnCredits } from '../../services/creditService'

const FeedActions = ({ onRefresh }) => {
  const { user } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await earnCredits('feed_refresh', user.token)
      onRefresh()
    } catch (err) {
      console.error('Refresh failed:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Content Feed</h2>
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="flex items-center space-x-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200 disabled:opacity-50"
      >
        <span>Refresh</span>
        {isRefreshing && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
      </button>
    </div>
  )
}

export default FeedActions