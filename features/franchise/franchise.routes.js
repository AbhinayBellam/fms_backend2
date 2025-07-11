// src/features/franchise/routes/franchise.routes.js
const router = require('express').Router();
const controller = require('./franchise.controller');
const authenticate = require('../../middleware/authenticate');
const auth = require('../../middleware/auth');



// Create franchise from approved application
router.post('/from-application/:applicationId', authenticate, auth('Franchisor'),controller.createFranchise);

// Standard CRUD
router.get('/', controller.getAllFranchises);
router.get('/:id', controller.getFranchiseById);
router.patch('/:id', authenticate, auth('Franchisor'),controller.updateFranchise);
router.delete('/:id',authenticate, auth('Franchisor'), controller.deleteFranchise);

module.exports = router;
