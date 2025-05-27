// src/features/user/user.service.js
const User = require('./user.model');

const createUser = async (data) => new User(data).save();

const getAllUsers = async () => User.find().populate('role');

const getUserById = async (id) => User.findById(id).populate('role');

const updateUser = async (id, data) => User.findByIdAndUpdate(id, data, { new: true });

const deleteUser = async (id) => User.findByIdAndDelete(id);

const findUserByEmail = async (email) => User.findOne({ email }).populate('role');

const saveResetToken = async (email, token, expiry) =>
  User.findOneAndUpdate({ email }, {
    resetPasswordToken: token,
    resetPasswordExpires: expiry
  });

const resetPassword = async (token, newPassword) =>
  User.findOneAndUpdate(
    { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } },
    { password: newPassword, resetPasswordToken: null, resetPasswordExpires: null },
    { new: true }
  );

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  saveResetToken,
  resetPassword
};
