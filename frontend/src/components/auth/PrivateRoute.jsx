import { useAuth } from '../../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, admin = false }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  
  if (!user) return <Navigate to="/login" />
  
  if (admin && user.role !== 'admin') return <Navigate to="/" />

  return children
}

export default PrivateRoute