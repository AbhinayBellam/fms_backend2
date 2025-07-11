// // src/features/product/services/stock.service.js
// const inventory = require('./inventory.model');
// const Product = require('../product/product.model');

// exports.getByFranchise = async (franchiseId) => {
//   return await inventory.find({ franchiseId })
//     .populate('productId', 'name price category images description');
// };
 
// src/features/product/services/inventory.service.js
const Inventory = require('./inventory.model');

exports.getByFranchise = async (franchiseId) => {
  return await Inventory.find({ franchiseId }).populate('productId', 'name price category images description');
};

exports.getByFranchiseAndProduct = async (franchiseId, productId) => {
  return await Inventory.findOne({ franchiseId, productId });
};

exports.createOrUpdateStock = async ({ franchiseId, productId, quantity }) => {
  const existing = await Inventory.findOne({ franchiseId, productId });

  if (existing) {
    existing.quantity += quantity;
    return await existing.save();
  }

  return await Inventory.create({ franchiseId, productId, quantity });
};

exports.updateStock = async (id, quantity) => {
  return await Inventory.findByIdAndUpdate(id, { quantity }, { new: true });
};

exports.deleteStock = async (id) => {
  return await Inventory.findByIdAndDelete(id);
};
