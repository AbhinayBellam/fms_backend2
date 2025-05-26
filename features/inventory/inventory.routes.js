// src/features/product/routes/stock.routes.js
const router = require('express').Router();
const controller = require('../controllers/stock.controller');

router.get('/:franchiseId', controller.getStockByFranchise); // Franchisee

module.exports = router;
