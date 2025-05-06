import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { fetchFeed } from '../../services/feedService'
import FeedItem from './FeedItem'

const FeedList = () => {
  const { user } = useAuth()
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const feeds = await fetchFeed(user.token)
        setFeedItems(feeds)
      } catch (err) {
        setError('Failed to load feed')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadFeed()
  }, [user])

  const handleSave = (id, isSaved) => {
    setFeedItems(prev => prev.map(item => 
      item.id === id ? { ...item, isSaved } : item
    ))
  }

  if (loading) return <div>Loading feed...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-4">
      {feedItems.map(item => (
        <FeedItem 
          key={item.id} 
          item={item} 
          onSave={handleSave}
        />
      ))}
    </div>
  )
}

export default FeedList