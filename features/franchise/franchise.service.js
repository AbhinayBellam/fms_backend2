// src/features/franchise/services/franchise.service.js
const Franchise = require('../models/franchise.model');

exports.createFranchise = async (data) => {
  return await Franchise.create(data);
};

exports.getAllFranchises = async () => {
  return await Franchise.find().populate('franchiseeId', 'name email');
};

exports.getFranchiseById = async (id) => {
  return await Franchise.findById(id).populate('franchiseeId');
};
