const CreditStats = ({ credits }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Credits</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Total Credits</p>
          <p className="text-3xl font-bold">{credits?.totalCredits || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Today's Earnings</p>
          <p className="text-xl">+{credits?.todayEarnings || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default CreditStats