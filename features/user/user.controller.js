// src/features/user/user.controller.js
const userService = require('./user.service');
const { generateToken } = require('./user.utils');

// CREATE / Register
exports.register = async (req, res) => {
  try {
    const existing = await userService.findUserByEmail(req.body.email);
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const user = await userService.createUser(req.body);
    const token = generateToken({ id: user._id, role: user.role });

    res.status(201).json({ message: 'User registered', user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User updated', user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
