const User = require('./user.model');

const createUser = async (data) => await User.create(data);
const getAllUsers = async () => await User.find().populate('role');
const getUserById = async (id) => await User.findById(id).populate('role');
const updateUser = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
const deleteUser = async (id) => await User.findByIdAndDelete(id);
const findUserByEmail = async (email) => await User.findOne({ email });
const findUserById = async (id) => await User.findById(id);

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  findUserById
};
