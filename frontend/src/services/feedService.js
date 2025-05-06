import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchFeed = async (token) => {
    const response = await axios.get(`${API_URL}/feed`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getSavedFeeds = async (token) => {
    const response = await axios.get(`${API_URL}/feed/saved`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const saveFeedItem = async (itemId, token) => {
    const response = await axios.post(`${API_URL}/feed/save`, { itemId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const reportFeedItem = async (itemId, reason, token) => {
    const response = await axios.post(`${API_URL}/feed/report`, { itemId, reason }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}