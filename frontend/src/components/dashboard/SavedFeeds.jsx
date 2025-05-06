import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getSavedFeeds } from '../../services/feedService'
import FeedItem from '../feed/FeedItem'

const SavedFeeds = () => {
  const { user } = useAuth()
  const [savedFeeds, setSavedFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSavedFeeds = async () => {
      try {
        const feeds = await getSavedFeeds(user.token)
        setSavedFeeds(feeds)
      } catch (err) {
        console.error('Failed to load saved feeds:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadSavedFeeds()
  }, [user])

  if (loading) return <div>Loading saved feeds...</div>

  return (
    <div className="space-y-4">
      {savedFeeds.length > 0 ? (
        savedFeeds.map(feed => (
          <FeedItem key={feed.id} item={feed} />
        ))
      ) : (
        <p className="text-gray-500">No saved feeds yet</p>
      )}
    </div>
  )
}

export default SavedFeeds