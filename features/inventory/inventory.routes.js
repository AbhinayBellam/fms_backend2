// // src/features/product/routes/stock.routes.js
// const router = require('express').Router();
// const controller = require('./inventory.controller');

// router.get('/:franchiseId', controller.getInventoryByFranchise); // Franchisee

// module.exports = router;

// src/features/product/routes/inventory.routes.js
const router = require('express').Router();
const controller = require('./inventory.controller');
const authenticate = require('../../middleware/authenticate');
const auth = require('../../middleware/auth');

// Routes for Franchisee (or Franchisor to monitor)

router.get('/:franchiseId', authenticate, auth( 'Franchisor'), controller.getInventoryByFranchise);
router.get('/my', authenticate, auth('Franchisee'), controller.getInventoryByFranchise); // Franchisee can view their own inventory
router.post('/', authenticate, auth('Franchisor'), controller.addOrUpdateStock); // Add new stock or update existing
router.put('/:id', authenticate, auth('Franchisor'), controller.updateStock);
router.delete('/:id', authenticate, auth('Franchisee'), controller.deleteStock);

module.exports = router;
