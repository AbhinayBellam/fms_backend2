// src/features/product/controllers/product.controller.js
const productService = require('./product.service');

exports.createProduct = async (req, res) => {
  const result = await productService.create(req.body, req.user._id);
  res.status(201).json(result);
};

exports.getAllProducts = async (req, res) => {
  const result = await productService.getAll();
  res.json(result);
};

exports.getProductById = async (req, res) => {
  const result = await productService.getById(req.params.id);
  res.json(result);
};

exports.updateProduct = async (req, res) => {
  const result = await productService.update(req.params.id, req.body);
  res.json(result);
};

exports.deleteProduct = async (req, res) => {
  const result = await productService.remove(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
