// src/features/franchise/models/franchise.model.js
const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  franchiseeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  commissionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
}, { timestamps: true });

module.exports = mongoose.model('Franchise', franchiseSchema);
