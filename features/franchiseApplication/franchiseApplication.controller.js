// src/features/franchise/controllers/franchiseApplication.controller.js
const service = require('./franchiseApplication.service');

exports.applyForFranchise = async (req, res) => {
  const result = await service.apply(req.body);
  res.status(201).json(result);
};

exports.getApplications = async (req, res) => {
  const result = await service.getAll();
  res.json(result);
};

exports.getApplicationById = async (req, res) => {
  const result = await service.getById(req.params.id);
  res.json(result);
};

exports.changeStatus = async (req, res) => {
  const result = await service.changeStatus(req.params.id, req.body.status);
  res.json(result);
};
