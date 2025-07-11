// routes/order.routes.js
const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const authenticate = require('../../middleware/authenticate');
const auth = require('../../middleware/auth');

router.post('/',authenticate,auth('Customer'), orderController.createOrder);
router.get('/',authenticate,auth('Franchisee'), orderController.getAllOrders);
router.get('/:id',authenticate,auth('Customer', 'Franchisee'), orderController.getOrderById);
router.get('/customer/:customerId',authenticate,auth('Customer'), orderController.getOrdersByCustomer);
router.put('/:id/status',authenticate,auth('Franchisee'), orderController.updateOrderStatus);
router.delete('/:id',authenticate,auth('Franchisee'), orderController.deleteOrder);

module.exports = router;
