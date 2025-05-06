import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { saveFeedItem, reportFeedItem } from '../../services/feedService'

const FeedItem = ({ item, onSave, onReport }) => {
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(item.isSaved || false)
  const [isReporting, setIsReporting] = useState(false)

  const handleSave = async () => {
    try {
      await saveFeedItem(item.id, user.token)
      setIsSaved(!isSaved)
      onSave && onSave(item.id, !isSaved)
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleReport = async (reason) => {
    setIsReporting(true)
    try {
      await reportFeedItem(item.id, reason, user.token)
      onReport && onReport(item.id)
    } catch (error) {
      console.error('Error reporting item:', error)
    } finally {
      setIsReporting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-1">Source: {item.source}</p>
          <p className="text-gray-700 mt-2">{item.content}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className={`p-2 rounded-full ${isSaved ? 'text-yellow-500' : 'text-gray-400'}`}
            aria-label={isSaved ? 'Unsave this item' : 'Save this item'}
          >
            {isSaved ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(item.url)}
            className="p-2 text-gray-500 rounded-full hover:text-blue-500"
            aria-label="Copy link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
          <div className="relative">
            <button
              disabled={isReporting}
              className="p-2 text-gray-500 rounded-full hover:text-red-500 disabled:opacity-50"
              aria-label="Report content"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedItem