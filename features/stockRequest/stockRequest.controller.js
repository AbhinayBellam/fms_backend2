// controllers/stockRequest.controller.js
const stockRequestService = require('../services/stockRequest.service');

exports.createStockRequest = async (req, res) => {
  try {
    const stockRequest = await stockRequestService.createStockRequest(req.body);
    res.status(201).json(stockRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStockRequests = async (req, res) => {
  try {
    const requests = await stockRequestService.getAllStockRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockRequestById = async (req, res) => {
  try {
    const request = await stockRequestService.getStockRequestById(req.params.id);
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockRequestsByFranchise = async (req, res) => {
  try {
    const requests = await stockRequestService.getStockRequestsByFranchise(req.params.franchiseId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStockRequestStatus = async (req, res) => {
  try {
    const updated = await stockRequestService.updateStockRequestStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStockRequest = async (req, res) => {
  try {
    await stockRequestService.deleteStockRequest(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
