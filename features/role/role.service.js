// src/features/role/role.service.js
const Role = require('./role.model');

const createRole = async (data) => {
  return await Role.create(data);
};

const getAllRoles = async () => {
  return await Role.find();
};

const getRoleById = async (id) => {
  return await Role.findById(id);
};

const updateRole = async (id, data) => {
  return await Role.findByIdAndUpdate(id, data, { new: true });
};

const deleteRole = async (id) => {
  return await Role.findByIdAndDelete(id);
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
