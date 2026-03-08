import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">Products</Link>
      </div>
      <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
    </nav>
  )
}