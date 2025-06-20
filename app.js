const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const roleRoutes = require('./features/role/role.routes');
const userRoutes = require('./features/user/user.routes');
const franchiseRoutes = require('./features/franchise/franchise.routes');
const applicationRoutes = require('./features/franchiseApplication/franchiseApplication.routes');
const productRoutes = require('./features/product/product.routes');
const stockRoutes = require('./features/inventory/inventory.routes');
// import other routes here

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/franchises', franchiseRoutes);
app.use('/api/franchise-applications', applicationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stocks', stockRoutes);

// Test route 
app.get('/', (req, res) => {
  res.send('🚀 Franchise Management System Backend is running');
});

module.exports = app;
