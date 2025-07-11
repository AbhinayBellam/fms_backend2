// // src/features/product/models/stock.model.js
// const mongoose = require('mongoose');

// const inventorySchema = new mongoose.Schema({
//   franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('inventory', inventorySchema);


// src/features/product/models/inventory.model.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  franchiseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Franchise',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    min: [0, 'Quantity cannot be negative']
  }
}, { timestamps: true });

inventorySchema.index({ franchiseId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);



