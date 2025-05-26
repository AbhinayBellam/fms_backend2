// routes/stockRequest.routes.js
const express = require('express');
const router = express.Router();
const stockRequestController = require('../controllers/stockRequest.controller');

// Franchisee
router.post('/', stockRequestController.createStockRequest);
router.get('/franchise/:franchiseId', stockRequestController.getStockRequestsByFranchise);

// Franchisor
router.get('/', stockRequestController.getAllStockRequests);
router.put('/:id/status', stockRequestController.updateStockRequestStatus);
router.get('/:id', stockRequestController.getStockRequestById);
router.delete('/:id', stockRequestController.deleteStockRequest);

module.exports = router;
