// // src/features/product/controllers/stock.controller.js
// const inventoryService = require('./inventory.service');

// exports.getInventoryByFranchise = async (req, res) => {
//   const inventory = await inventoryService.getByFranchise(req.params.franchiseId);
//   res.json(inventory);
// };


// src/features/product/controllers/inventory.controller.js
const inventoryService = require('./inventory.service');

exports.getInventoryByFranchise = async (req, res) => {
  try {
    const data = await inventoryService.getByFranchise(req.params.franchiseId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.addOrUpdateStock = async (req, res) => {
  try {
    const { franchiseId, productId, quantity } = req.body;
    const stock = await inventoryService.createOrUpdateStock({ franchiseId, productId, quantity });
    res.status(200).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const stock = await inventoryService.updateStock(req.params.id, req.body.quantity);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const stock = await inventoryService.deleteStock(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    res.json({ message: 'Stock deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
