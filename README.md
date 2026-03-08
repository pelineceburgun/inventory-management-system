# 📦 Inventory Management System

A full-stack inventory management web application that allows businesses to track their products, monitor stock levels, and visualize inventory data through an interactive dashboard.

Built as a portfolio project to demonstrate full-stack development skills using modern web technologies.


---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login system with token-based authentication. Protected routes redirect unauthenticated users to the login page.
- 📋 **Product Management** — Full CRUD functionality to add, edit, and delete products with fields for name, SKU, category, quantity, price, and low stock threshold.
- 🔍 **Search & Filter** — Real-time search by product name or SKU, and filter by category using a dynamic dropdown populated from live data.
- 🚨 **Low Stock Alerts** — Products at or below their defined stock threshold are automatically highlighted in red in the products table.
- 📊 **Dashboard** — Overview of key metrics including total products, total inventory value, and number of low stock items, alongside a bar chart showing stock levels by category.
- 📱 **Responsive Design** — Clean, responsive UI built with Tailwind CSS that works across different screen sizes.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI library for building component-based interfaces |
| Vite | Fast build tool and development server |
| Tailwind CSS | Utility-first CSS framework for styling |
| React Router | Client-side routing and navigation |
| Axios | HTTP client for API requests |
| Recharts | Chart library for dashboard visualizations |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express | Web framework for building the REST API |
| bcryptjs | Password hashing for secure storage |
| jsonwebtoken | JWT generation and verification |
| pg | PostgreSQL client for Node.js |
| dotenv | Environment variable management |

### Database & Hosting
| Service | Purpose |
|---|---|
| PostgreSQL (Neon) | Cloud-hosted relational database |
| Vercel | Frontend deployment and hosting |
| Render | Backend API deployment and hosting |

---

## 🏗️ Project Structure
```
inventory-management-system/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx    # Navigation bar with logout
│   │   ├── pages/
│   │   │   ├── Login.jsx     # Login page
│   │   │   ├── Dashboard.jsx # Stats and charts overview
│   │   │   └── Products.jsx  # Product table with CRUD
│   │   ├── api.js            # Base API URL config
│   │   ├── App.jsx           # Routes and layout
│   │   └── main.jsx          # App entry point
│   └── package.json
└── server/                   # Express backend
    ├── middleware/
    │   └── auth.js           # JWT verification middleware
    ├── routes/
    │   ├── auth.js           # Login and register endpoints
    │   └── products.js       # Product CRUD endpoints
    ├── db.js                 # PostgreSQL connection
    ├── index.js              # Server entry point
    └── package.json
```






