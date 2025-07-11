const User = require('./user.model');
const Role = require('../role/role.model');

// Create a new user (assign Role ObjectId)
const createUser = async (data) => {
  const role = await Role.findOne({ name: data.role });
  if (!role) throw new Error('Invalid role provided');

  data.role = role._id;

  const newUser = new User(data);
  return await newUser.save();
};

// Find user by ID (excluding password)
const getById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

// Get all users (with role populated)
const getAllUsers = async () => {
  return await User.find().populate('role');
};

// Get only non-deleted users
const getAllUsersNotDeleted = async () => {
  return await User.find({ deleted: false }).populate('role');
};

// Find user by ID and populate role
const getUserById = async (id) => {
  const user = await User.findById(id).populate('role');
  if (!user) throw new Error('User not found');
  return user;
};

// Update user by ID
const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).populate('role');
  if (!user) throw new Error('User not found');
  return user;
};

// Update user profile (patch-style)
const updateProfile = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  Object.assign(user, data);
  return await user.save();
};

// Delete user by ID
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};

// Soft delete (mark as deleted)
const softDeleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.deleted = true;
  user.deletedAt = new Date();
  await user.save();

  return { message: 'User soft deleted successfully' };
};

// Restore soft-deleted user
const restoreUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.deleted = false;
  user.deletedAt = null;
  await user.save();

  return { message: 'User restored successfully' };
};

// Find user by email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email }).populate('role');
  if (!user) throw new Error('User not found');
  return user;
};

// Save password reset token and expiry
const saveResetToken = async (email, token, expiry) => {
  const user = await User.findOneAndUpdate(
    { email },
    { resetPasswordToken: token, resetPasswordExpires: expiry },
    { new: true }
  );
  if (!user) throw new Error('User not found');
  return user;
};

// Reset password with token
const resetPassword = async (token, newPassword) => {
  const user = await User.findOneAndUpdate(
    { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } },
    { password: newPassword, resetPasswordToken: null, resetPasswordExpires: null },
    { new: true }
  );
  if (!user) throw new Error('Token invalid or expired');
  return user;
};

module.exports = {
  createUser,
  getById,
  getAllUsers,
  getAllUsersNotDeleted,
  getUserById,
  updateUser,
  updateProfile,
  deleteUser,
  softDeleteUser,
  restoreUser,
  findUserByEmail,
  saveResetToken,
  resetPassword,
};
