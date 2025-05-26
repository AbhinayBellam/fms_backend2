// src/features/product/services/stock.service.js
const Stock = require('../models/stock.model');
const Product = require('../models/product.model');

exports.getByFranchise = async (franchiseId) => {
  return await Stock.find({ franchiseId })
    .populate('productId', 'name price category images description');
};
 