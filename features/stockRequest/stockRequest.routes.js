// routes/stockRequest.routes.js
const express = require('express');
const router = express.Router();
const stockRequestController = require('./stockRequest.controller');
const authenticate  = require('../../middleware/authenticate');
const  auth = require('../../middleware/auth');

// Franchisee
router.post('/', authenticate, auth('Franchisee'),stockRequestController.createStockRequest);
router.get('/franchise/:franchiseId', authenticate, auth('Franchisee') ,stockRequestController.getStockRequestsByFranchise);

// Franchisor
router.get('/',authenticate, auth('Franchisor'),stockRequestController.getAllStockRequests);
router.put('/:id/status', authenticate, auth('Franchisor'),stockRequestController.updateStockRequestStatus);
router.get('/:id', authenticate, auth('Franchisor'),stockRequestController.getStockRequestById);
router.delete('/:id', authenticate, auth('Franchisor'),stockRequestController.deleteStockRequest);

module.exports = router;
