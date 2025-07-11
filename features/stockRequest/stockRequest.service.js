const StockRequest = require('./stockRequest.model');
const Inventory = require('../inventory/inventory.model');

exports.createStockRequest = async (data) => {
  return await StockRequest.create(data);
};

exports.getAllStockRequests = async () => {
  return await StockRequest.find()
    .populate('franchiseId', 'name')
    .populate('items.productId', 'name price');
};

exports.getStockRequestById = async (id) => {
  return await StockRequest.findById(id)
    .populate('franchiseId', 'name')
    .populate('items.productId', 'name price');
};

exports.getStockRequestsByFranchise = async (franchiseId) => {
  return await StockRequest.find({ franchiseId })
    .populate('items.productId', 'name price');
};

exports.updateStockRequestStatus = async (id, status) => {
  const request = await StockRequest.findById(id);

  if (!request) throw new Error('Stock request not found');

  request.status = status;
  await request.save();

  // 👉 Update inventory only if status is approved
  if (status === 'Approved') {
    for (const item of request.items) {
      const existing = await Inventory.findOne({
        franchiseId: request.franchiseId,
        productId: item.productId,
      });

      if (existing) {
        existing.quantity += item.quantity;
        await existing.save();
      } else {
        await Inventory.create({
          franchiseId: request.franchiseId,
          productId: item.productId,
          quantity: item.quantity,
        });
      }
    }
  }

  return request;
};

exports.deleteStockRequest = async (id) => {
  return await StockRequest.findByIdAndDelete(id);
};
