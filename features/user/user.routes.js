// src/features/user/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

const authenticate = require('../../middleware/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/email/:email', userController.getUserByEmail);

router.get('/dashboard', authenticate, userController.getDashboard);

module.exports = router;
