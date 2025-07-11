// src/features/product/routes/product.routes.js
const router = require('express').Router();
const controller = require('./product.controller');
const authenticate = require('../../middleware/authenticate');
const auth = require('../../middleware/auth');

router.post('/', authenticate,auth('Franchisor'), controller.createProduct);          // Franchisor
router.get('/', controller.getAllProducts);                        // All users
router.get('/:id', controller.getProductById);                     // All users
router.put('/:id', authenticate, auth('Franchisor'),controller.updateProduct);        // Franchisor
router.delete('/:id', authenticate, auth('Franchisor'),controller.deleteProduct);     // Franchisor

module.exports = router;
