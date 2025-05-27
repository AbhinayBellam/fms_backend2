//  /features/role/role.routes.js
const express = require('express');
const router = express.Router();
const roleController = require('./role.controller');

// Role CRUD APIs
router.post('/', roleController.createRole);
router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
