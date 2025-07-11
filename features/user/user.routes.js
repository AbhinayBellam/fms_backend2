// src/features/user/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

const authenticate = require('../../middleware/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

// user.routes.js
router.get('/me', authenticate, userController.getProfile);

router.put('/me', authenticate, userController.updateProfile);
router.get('/dashboard', authenticate, userController.getDashboard);

router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/email/:email', userController.getUserByEmail);

router.get('/', userController.getAllUsersNotDeleted); // Get all users not deleted
router.delete('/:userId', userController.softDeleteUser); // Soft delete
router.put('/restore/:userId', userController.restoreUser); // Optional restore



module.exports = router;
