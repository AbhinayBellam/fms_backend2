// src/features/franchise/services/franchiseApplication.service.js
const FranchiseApplication = require('../models/franchiseApplication.model');

exports.apply = async (data) => {
  return await FranchiseApplication.create(data);
};

exports.getAll = async () => {
  return await FranchiseApplication.find().populate('franchiseeId', 'name email');
};

exports.getById = async (id) => {
  return await FranchiseApplication.findById(id).populate('franchiseeId');
};

exports.changeStatus = async (id, status) => {
  return await FranchiseApplication.findByIdAndUpdate(id, { status }, { new: true });
};
