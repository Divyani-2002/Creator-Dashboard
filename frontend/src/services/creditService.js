import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getCredits = async (token) => {
    const response = await axios.get(`${API_URL}/credits`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const earnCredits = async (action, token) => {
    const response = await axios.post(`${API_URL}/credits/earn`, { action }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getRecentActivity = async (token) => {
    const response = await axios.get(`${API_URL}/credits/activity`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAllUsersCredits = async (token) => {
    const response = await axios.get(`${API_URL}/admin/credits`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const updateUserCredits = async (userId, amount, token) => {
    const response = await axios.put(`${API_URL}/admin/credits/${userId}`, { amount }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}