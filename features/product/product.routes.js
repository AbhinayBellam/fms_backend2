// src/features/product/routes/product.routes.js
const router = require('express').Router();
const controller = require('../controllers/product.controller');
const authenticate = require('@/middlewares/authenticate');

router.post('/', authenticate, controller.createProduct);          // Franchisor
router.get('/', controller.getAllProducts);                        // All users
router.get('/:id', controller.getProductById);                     // All users
router.put('/:id', authenticate, controller.updateProduct);        // Franchisor
router.delete('/:id', authenticate, controller.deleteProduct);     // Franchisor

module.exports = router;
