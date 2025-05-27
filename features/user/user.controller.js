const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./user.service');
const { sendResetEmail } = require('../utils/email.utils');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const RESET_TOKEN_EXPIRE_MINUTES = 15;

// CRUD
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: `${RESET_TOKEN_EXPIRE_MINUTES}m` }
    );

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.findUserById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};
