// src/features/product/controllers/stock.controller.js
const stockService = require('../services/stock.service');

exports.getStockByFranchise = async (req, res) => {
  const stocks = await stockService.getByFranchise(req.params.franchiseId);
  res.json(stocks);
};
