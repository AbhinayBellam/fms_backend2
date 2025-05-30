// src/features/franchise/routes/franchiseApplication.routes.js
const router = require('express').Router();
const controller = require('./franchiseApplication.controller');
const authenticate = require('../../middleware/authenticate');
const auth = require('../../middleware/auth');

// Franchisee — apply and check own application
router.post('/', authenticate, auth('Franchisee'), controller.applyForFranchise);
router.get('/my', authenticate, auth('Franchisee'), controller.getMyApplication);

// Franchisor — manage all applications
router.get('/', authenticate, auth('Franchisor'), controller.getApplications);
router.get('/:id', authenticate, auth('Franchisor'), controller.getApplicationById);
router.patch('/:id/status', authenticate, auth('Franchisor'), controller.changeStatus);

module.exports = router;
