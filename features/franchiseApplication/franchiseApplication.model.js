// src/features/franchise/models/franchiseApplication.model.js
const mongoose = require('mongoose');

const franchiseApplicationSchema = new mongoose.Schema({
  franchiseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  region: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  additionalDetails: { type: String },
  status: {
    type: String,
    enum: ['Not_Applied', 'Pending', 'Approved', 'Rejected'],
    default: 'Not_Applied',
  },
}, { timestamps: true });

module.exports = mongoose.model('FranchiseApplication', franchiseApplicationSchema);
