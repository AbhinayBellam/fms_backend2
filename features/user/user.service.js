// src/features/user/user.service.js
const User = require('./user.model');
const Role = require('../role/role.model');

const createUser = async (data) => {
  try {
    // Convert role name to Role ObjectId
    const role = await Role.findOne({ name: data.role });
    if (!role) {
      throw new Error('Invalid role provided');
    }

    data.role = role._id; // Replace role string with ObjectId

    // console.log('Creating user with data:', data);
    const newUser = new User(data);
    // console.log('New user object:', newUser);
// 
    const savedUser = await newUser.save();
    // console.log('Saved user:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error while saving user:', error);
    throw error;
  }
};


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
