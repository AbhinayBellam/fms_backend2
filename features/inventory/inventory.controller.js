// src/features/product/controllers/stock.controller.js
const inventoryService = require('./inventory.service');

exports.getInventoryByFranchise = async (req, res) => {
  const inventory = await inventoryService.getByFranchise(req.params.franchiseId);
  res.json(inventory);
};
