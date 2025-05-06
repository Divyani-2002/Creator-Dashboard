import FeedList from '../components/feed/FeedList'
import FeedActions from '../components/feed/FeedActions'
import { useState } from 'react'

const Feed = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FeedActions onRefresh={handleRefresh} />
      <FeedList key={refreshKey} />
    </div>
  )
}

export default Feed