// src/features/franchise/controllers/franchise.controller.js
const franchiseService = require('./franchise.service');

exports.createFranchise = async (req, res) => {
  const { applicationId } = req.params;
  const { name, commissionRate } = req.body;

  const franchise = await franchiseService.createFranchiseFromApplication(applicationId, {
    name,
    commissionRate,
  });

  res.status(201).json({ message: 'Franchise created successfully', franchise });
};

exports.getAllFranchises = async (req, res) => {
  const franchises = await franchiseService.getAllFranchises();
  res.json(franchises);
};

exports.getFranchiseById = async (req, res) => {
  const franchise = await franchiseService.getFranchiseById(req.params.id);
  res.json(franchise);
};

exports.updateFranchise = async (req, res) => {
  const updated = await franchiseService.updateFranchise(req.params.id, req.body);
  res.json({ message: 'Franchise updated successfully', franchise: updated });
};

exports.deleteFranchise = async (req, res) => {
  const result = await franchiseService.deleteFranchise(req.params.id);
  res.json(result);
};
