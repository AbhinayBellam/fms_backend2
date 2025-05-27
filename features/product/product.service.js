// src/features/product/services/product.service.js
const Product = require('./product.model');

exports.create = async (data, userId) => {
  return await Product.create({ ...data, createdBy: userId });
};

exports.getAll = async () => {
  return await Product.find().select('-__v');
};

exports.getById = async (id) => {
  return await Product.findById(id).select('-__v');
};

exports.update = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await Product.findByIdAndDelete(id);
};
