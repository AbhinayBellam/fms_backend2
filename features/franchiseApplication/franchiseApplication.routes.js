// src/features/franchise/routes/franchiseApplication.routes.js
const router = require('express').Router();
const controller = require('./franchiseApplication.controller');

router.post('/', controller.applyForFranchise);
router.get('/', controller.getApplications);
router.get('/:id', controller.getApplicationById);
router.patch('/:id/status', controller.changeStatus);

module.exports = router;
