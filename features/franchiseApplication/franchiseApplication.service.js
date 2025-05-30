// src/features/franchise/services/franchiseApplication.service.js
const FranchiseApplication = require('./franchiseApplication.model');

exports.apply = async (data) => {
  return await FranchiseApplication.create(data);
};

exports.getAll = async () => {
  return await FranchiseApplication.find().populate('franchiseeId', 'name email');
};

exports.getById = async (id) => {
  return await FranchiseApplication.findById(id).populate('franchiseeId', 'name email');
};

exports.changeStatus = async (id, status) => {
  return await FranchiseApplication.findByIdAndUpdate(id, { status }, { new: true });
};

exports.getPendingApplications = async () => {
  return await FranchiseApplication.find({ status: 'pending' }).populate('franchiseeId', 'name email');
};

exports.getApplicationByFranchiseeId = async (franchiseeId) => {
  return await FranchiseApplication.findOne({ franchiseeId });
};
