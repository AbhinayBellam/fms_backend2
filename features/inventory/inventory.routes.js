// src/features/product/routes/stock.routes.js
const router = require('express').Router();
const controller = require('./inventory.controller');

router.get('/:franchiseId', controller.getInventoryByFranchise); // Franchisee

module.exports = router;
