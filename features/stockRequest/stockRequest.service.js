// services/stockRequest.service.js
const StockRequest = require('../models/stockRequest.model');

exports.createStockRequest = async (data) => {
  return await StockRequest.create(data);
};

exports.getAllStockRequests = async () => {
  return await StockRequest.find().populate('franchiseId items.productId');
};

exports.getStockRequestById = async (id) => {
  return await StockRequest.findById(id).populate('franchiseId items.productId');
};

exports.getStockRequestsByFranchise = async (franchiseId) => {
  return await StockRequest.find({ franchiseId }).populate('items.productId');
};

exports.updateStockRequestStatus = async (id, status) => {
  return await StockRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

exports.deleteStockRequest = async (id) => {
  return await StockRequest.findByIdAndDelete(id);
};
