// services/order.service.js
const Order = require('./order.model');

exports.createOrder = async (data) => {
  const order = new Order(data);
  return await order.save();
};

exports.getAllOrders = async () => {
  return await Order.find().populate('customerId franchiseId items.productId');
};

exports.getOrderById = async (id) => {
  return await Order.findById(id).populate('customerId franchiseId items.productId');
};

exports.getOrdersByCustomerId = async (customerId) => {
  return await Order.find({ customerId }).populate('items.productId franchiseId');
};

exports.updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
