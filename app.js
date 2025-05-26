const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const roleRoutes = require('./role/role.routes');
const userRoutes = require('./user/user.routes');

// import other routes here

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Franchise Management System Backend is running');
});

module.exports = app;
