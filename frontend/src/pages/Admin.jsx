import UserAnalytics from '../components/admin/UserAnalytics'
import CreditManagement from '../components/admin/CreditManagement'

const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <UserAnalytics />
        <CreditManagement />
      </div>
    </div>
  )
}

export default Admin