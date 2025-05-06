import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, getCurrentUser } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token)
          setUser(userData)
        } catch (err) {
          logout()
        }
      }
      setIsLoading(false)
    }
    loadUser()
  }, [token])

  const login = async (credentials) => {
    try {
      const { token: authToken, user: userData } = await loginUser(credentials)
      localStorage.setItem('token', authToken)
      setToken(authToken)
      setUser(userData)
      navigate('/')
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const { token: authToken, user: userData } = await registerUser(userData)
      localStorage.setItem('token', authToken)
      setToken(authToken)
      setUser(userData)
      navigate('/')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)