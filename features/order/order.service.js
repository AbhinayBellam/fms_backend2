const Order = require('./order.model');
const Inventory = require('../inventory/inventory.model');
// const mongoose = require('mongoose');

// exports.createOrder = async (data) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { franchiseId, items } = data;

//     // Check inventory for each item
//     for (const item of items) {
//       const stock = await Inventory.findOne({
//         franchiseId,
//         productId: item.productId
//       }).session(session);

//       if (!stock || stock.quantity < item.quantity) {
//         throw new Error(`Insufficient stock for product ID ${item.productId}`);
//       }

//       stock.quantity -= item.quantity;
//       await stock.save({ session });
//     }

//     // Save order
//     const order = new Order(data);
//     const savedOrder = await order.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     return savedOrder;
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     throw err;
//   }
// };

exports.createOrder = async (data) => {
  const { franchiseId, items } = data;

  for (const item of items) {
    const stock = await Inventory.findOne({
      franchiseId,
      productId: item.productId
    });

    if (!stock || stock.quantity < item.quantity) {
      throw new Error(`Insufficient stock for product ID ${item.productId}`);
    }

    stock.quantity -= item.quantity;
    await stock.save();
  }

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
