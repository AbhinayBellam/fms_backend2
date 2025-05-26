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



const franchiseRoutes = require('./features/franchise/routes/franchise.routes');
const applicationRoutes = require('./features/franchise/routes/franchiseApplication.routes');

app.use('/api/franchises', franchiseRoutes);
app.use('/api/franchise-applications', applicationRoutes);


// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Franchise Management System Backend is running');
});

module.exports = app;
