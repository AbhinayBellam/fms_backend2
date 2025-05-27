// src/features/franchise/routes/franchise.routes.js
const router = require('express').Router();
const controller = require('./franchise.controller');

router.post('/', controller.createFranchise);
router.get('/', controller.getAllFranchises);
router.get('/:id', controller.getFranchiseById);

module.exports = router;
