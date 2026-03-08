import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../api.js' 

export default function Products() {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', sku: '', category: '', quantity: '', price: '', low_stock_threshold: 10 })
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const categories = [...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === '' || p.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products`, { headers })
    setProducts(res.data)
  }

  useEffect(() => { fetchProducts() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({ name: '', sku: '', category: '', quantity: '', price: '', low_stock_threshold: 10 })
    setShowModal(true)
  }

  const openEdit = (product) => {
    setEditing(product.id)
    setForm(product)
    setShowModal(true)
  }

  const handleSave = async () => {
    if (editing) {
      await axios.put(`${API_URL}/products/${editing}`, form, { headers })
    } else {
      await axios.post(`${API_URL}/products`, form, { headers })
    }
    setShowModal(false)
    fetchProducts()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/products/${id}`, { headers })
    fetchProducts()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Product
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-sm"
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'SKU', 'Category', 'Quantity', 'Price', 'Actions'].map(h => (
                <th key={h} className="text-left p-4 text-gray-600 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id} className={`border-t ${p.quantity <= p.low_stock_threshold ? 'bg-red-50' : ''}`}>
                <td className="p-4">{p.name}</td>
                <td className="p-4 text-gray-500">{p.sku}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">
                  <span className={p.quantity <= p.low_stock_threshold ? 'text-red-600 font-bold' : ''}>
                    {p.quantity}
                  </span>
                </td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">
                  <button onClick={() => openEdit(p)} className="text-blue-600 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Edit Product' : 'Add Product'}</h2>
            {['name', 'sku', 'category', 'quantity', 'price', 'low_stock_threshold'].map(field => (
              <input
                key={field}
                placeholder={field.replace('_', ' ')}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-3"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
}
