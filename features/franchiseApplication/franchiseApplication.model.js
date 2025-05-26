// src/features/franchise/models/franchiseApplication.model.js
const mongoose = require('mongoose');

const franchiseApplicationSchema = new mongoose.Schema({
  franchiseeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('FranchiseApplication', franchiseApplicationSchema);
