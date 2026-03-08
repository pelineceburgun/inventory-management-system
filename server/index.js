const express = require('express')
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/products', productRoutes)

app.get('/', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ message: 'Server and database are connected!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})