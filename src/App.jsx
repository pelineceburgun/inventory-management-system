import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Navbar from './components/Navbar'

function PrivateLayout({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" />
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateLayout><Dashboard /></PrivateLayout>} />
      <Route path="/products" element={<PrivateLayout><Products /></PrivateLayout>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}