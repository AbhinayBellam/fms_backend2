// src/features/franchise/controllers/franchise.controller.js
const service = require('./franchise.service');

exports.createFranchise = async (req, res) => {
  const result = await service.createFranchise(req.body);
  res.status(201).json(result);
};

exports.getAllFranchises = async (req, res) => {
  const result = await service.getAllFranchises();
  res.json(result);
};

exports.getFranchiseById = async (req, res) => {
  const result = await service.getFranchiseById(req.params.id);
  res.json(result);
};
