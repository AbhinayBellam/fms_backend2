// src/features/user/user.controller.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userService = require('./user.service');
const {sendEmail} = require('../../utils/email.utils');

const sanitizeUser = require('../../utils/sanitizeUser');

const generateToken = (user) => jwt.sign(
  { id: user._id, email: user.email, role: user.role?.name, franchiseStatus: user.franchiseStatus },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

const generateRefreshToken = (user) => jwt.sign(
  { id: user._id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);



exports.register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const cleanUser = await userService.findUserByEmail(user.email); // Populate role
    res.status(201).json({
      message: 'User registered successfully',
      user: sanitizeUser(cleanUser)
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('login hit');
    const user = await userService.findUserByEmail(req.body.email); // Populate role
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('User populated:', user.role);
    const accessToken = generateToken(user);
    console.log('Generated token payload:', jwt.decode(accessToken));
    const refreshToken = generateRefreshToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      token: accessToken,
      refreshToken,
      user: sanitizeUser(user)
    });

    console.log('User logged in:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role?.name,
      franchiseStatus: user.franchiseStatus
    });
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
exports.softDeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userService.softDeleteUser(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllUsersNotDeleted = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.restoreUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userService.restoreUser(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// user.controller.js
exports.getProfile = async (req, res) => {
  try {
    console.log('User from req.user:', req.user); 
    const user = await userService.getById(req.user._id);
    console.log('Fetched user:', user); // ✅ Add this
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error in getProfile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user._id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



const franchiseAppService = require('../franchiseApplication/franchiseApplication.service');

exports.getDashboard = async (req, res) => {
  const { role, _id } = req.user;

  try {
    switch (role) {
      case 'Franchisor':
        // Fetch all pending franchise applications
        const pendingApplications = await franchiseAppService.getPendingApplications();
        return res.json({
          message: 'Franchisor dashboard',
          pendingApplications,
        });

      case 'Franchisee':
  switch (req.user.franchiseStatus) {
    case 'Not Applied':
      return res.json({ message: 'Apply for a franchise', redirectTo: 'ApplyFranchiseScreen' });
    case 'Pending':
      return res.json({ message: 'Waiting for approval', redirectTo: 'PendingApprovalScreen' });
    case 'Approved':
      return res.json({ message: 'Welcome to your dashboard', redirectTo: 'FranchiseDashboard' });
    case 'Rejected':
      return res.json({ message: 'Application Rejected', redirectTo: 'ApplicationRejectedScreen' });
    default:
      return res.status(400).json({ error: 'Unknown franchise status' });
  }

      case 'Customer':
        return res.json({ message: 'Customer dashboard', redirectTo: 'CustomerDashboard' });

      default:
        return res.status(403).json({ error: 'Unknown role' });
    }
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

