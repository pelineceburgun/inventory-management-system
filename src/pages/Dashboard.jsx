import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import API_URL from '../api.js'

export default function Dashboard() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:5000/products', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data))
  }, [])

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const lowStock = products.filter(p => p.quantity <= p.low_stock_threshold).length

  const categoryData = products.reduce((acc, p) => {
    const found = acc.find(i => i.category === p.category)
    if (found) found.quantity += p.quantity
    else acc.push({ category: p.category, quantity: p.quantity })
    return acc
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Total Products</p>
          <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Total Value</p>
          <p className="text-3xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Low Stock Items</p>
          <p className="text-3xl font-bold text-red-600">{lowStock}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Stock by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}