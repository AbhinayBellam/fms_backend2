// src/features/user/user.controller.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userService = require('./user.service');
const {sendEmail} = require('../../utils/email.utils');

const generateToken = (user) => jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

exports.register = async (req, res) => {
  try {
    console.log('Registering user:', req.body);
    const user = await userService.createUser(req.body);
    console.log('User created:', user);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user) return res.status(404).json({ error: 'Email not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 15;

    await userService.saveResetToken(user.email, token, expiry);

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendEmail(user.email, 'Reset Password', `Click to reset: ${resetLink}`);

    res.json({ message: 'Reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await userService.resetPassword(req.params.token, req.body.password);
    if (!user) return res.status(400).json({ error: 'Token invalid or expired' });
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CRUD
exports.createUser = exports.register;

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};

exports.getUserByEmail = async (req, res) => {
  const user = await userService.findUserByEmail(req.params.email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};
