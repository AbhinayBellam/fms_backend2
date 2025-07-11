// src/features/franchise/services/franchise.service.js
const Franchise = require('./franchise.model');
const FranchiseApplication = require('../franchiseApplication/franchiseApplication.model');

exports.createFranchiseFromApplication = async (applicationId, data) => {
  const application = await FranchiseApplication.findById(applicationId);
  if (!application) throw new Error('Franchise application not found');
  if (application.status !== 'Approved') throw new Error('Application not approved');

  const franchise = await Franchise.create({
    name: data.name,
    commissionRate: data.commissionRate,
    franchiseeId: application.franchiseeId,
    address: application.address,
  });

  return franchise;
};

exports.getAllFranchises = async () => {
  return await Franchise.find().populate('franchiseeId', 'name email');
};

exports.getFranchiseById = async (id) => {
  const franchise = await Franchise.findById(id).populate('franchiseeId', 'name email');
  if (!franchise) throw new Error('Franchise not found');
  return franchise;
};

exports.updateFranchise = async (id, updates) => {
  const allowedFields = ['name', 'commissionRate'];
  const updateData = {};

  for (const key of allowedFields) {
    if (updates[key] !== undefined) updateData[key] = updates[key];
  }

  const updated = await Franchise.findByIdAndUpdate(id, updateData, { new: true });
  if (!updated) throw new Error('Franchise not found');
  return updated;
};

exports.deleteFranchise = async (id) => {
  const deleted = await Franchise.findByIdAndDelete(id);
  if (!deleted) throw new Error('Franchise not found or already deleted');
  return { message: 'Franchise deleted successfully' };
};
