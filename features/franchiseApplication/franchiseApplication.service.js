// src/features/franchise/services/franchiseApplication.service.js
const FranchiseApplication = require('./franchiseApplication.model');

const User = require('../user/user.model'); // <-- Add this

exports.apply = async (data) => {
  const application = await FranchiseApplication.create(data);
  await User.findByIdAndUpdate(data.franchiseeId, { franchiseStatus: 'Pending' });
  return application;
};


exports.getAll = async () => {
  return await FranchiseApplication.find().populate('franchiseeId', 'name email');
};

exports.getById = async (id) => {
  return await FranchiseApplication.findById(id).populate('franchiseeId', 'name email');
};

exports.changeStatus = async (id, status) => {
  const updatedApp = await FranchiseApplication.findByIdAndUpdate(id, { status }, { new: true });

  if (updatedApp && updatedApp.franchiseeId) {
    await User.findByIdAndUpdate(updatedApp.franchiseeId, { franchiseStatus: status });
  }

  return updatedApp;
};

exports.getPendingApplications = async () => {
  return await FranchiseApplication.find({ status: 'Pending' }).populate('franchiseeId', 'name email');
};

exports.getApplicationByFranchiseeId = async (franchiseeId) => {
  return await FranchiseApplication.findOne({ franchiseeId });
};












