const orderService = require('./order.service');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

exports.getOrdersByCustomer = async (req, res) => {
  const orders = await orderService.getOrdersByCustomerId(req.params.customerId);
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await orderService.updateOrderStatus(req.params.id, status);
  res.json({ message: `Order status updated to ${status}`, updated });
};

exports.deleteOrder = async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  res.json({ message: 'Order deleted successfully' });
};
