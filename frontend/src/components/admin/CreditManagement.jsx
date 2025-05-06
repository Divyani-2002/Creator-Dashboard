import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getAllUsersCredits, updateUserCredits } from '../../services/creditService.js'

const CreditManagement = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsersCredits(user.token)
        setUsers(data)
      } catch (err) {
        console.error('Failed to load users:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadUsers()
  }, [user])

  const handleEdit = (user) => {
    setEditingId(user._id)
    setEditValue(user.totalCredits)
  }

  const handleSave = async (userId) => {
    try {
      await updateUserCredits(userId, parseInt(editValue), user.token)
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, totalCredits: parseInt(editValue) } : u
      ))
      setEditingId(null)
    } catch (err) {
      console.error('Failed to update credits:', err)
    }
  }

  if (loading) return <div>Loading users...</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Credit Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === user._id ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                    />
                  ) : (
                    user.totalCredits
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === user._id ? (
                    <button
                      onClick={() => handleSave(user._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreditManagement