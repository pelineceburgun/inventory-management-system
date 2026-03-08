const express = require('express')
const router = express.Router()
const pool = require('../db')
const authMiddleware = require('../middleware/auth')

// All routes below require a valid JWT token
router.use(authMiddleware)

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add a product
router.post('/', async (req, res) => {
  const { name, sku, category, quantity, price, low_stock_threshold } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO products (name, sku, category, quantity, price, low_stock_threshold) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, sku, category, quantity, price, low_stock_threshold || 10]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(400).json({ error: 'SKU already exists' })
  }
})

// Update a product
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, sku, category, quantity, price, low_stock_threshold } = req.body
  try {
    const result = await pool.query(
      'UPDATE products SET name=$1, sku=$2, category=$3, quantity=$4, price=$5, low_stock_threshold=$6 WHERE id=$7 RETURNING *',
      [name, sku, category, quantity, price, low_stock_threshold, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id])
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router