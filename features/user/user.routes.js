// src/features/user/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authenticate = require('../../middleware/auth.middleware');

// Auth Routes
router.post('/register', userController.register);         // Create
router.post('/login', userController.login);               // Login

// Protected Routes
router.get('/profile', authenticate, userController.getProfile);  // Get logged-in user's profile

// Admin / management routes
router.get('/', authenticate, userController.getAllUsers);       // List all users
router.get('/:id', authenticate, userController.getUserById);    // Get user by ID
router.put('/:id', authenticate, userController.updateUser);     // Update user by ID
router.delete('/:id', authenticate, userController.deleteUser);  // Delete user by ID

module.exports = router;
