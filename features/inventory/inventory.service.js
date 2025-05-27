// src/features/product/services/stock.service.js
const inventory = require('./inventory.model');
const Product = require('../product/product.model');

exports.getByFranchise = async (franchiseId) => {
  return await inventory.find({ franchiseId })
    .populate('productId', 'name price category images description');
};
 