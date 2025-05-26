// src/features/user/user.service.js
const User = require('./user.model');

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).populate('role');
};

const getUserById = async (id) => {
  return await User.findById(id).populate('role');
};

const getAllUsers = async () => {
  return await User.find().populate('role');
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).populate('role');
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
