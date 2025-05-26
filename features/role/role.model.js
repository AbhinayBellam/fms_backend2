// src/features/role/role.model.js

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['Franchisor', 'Franchisee', 'Customer', 'Admin'], // Add more roles as needed
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    permissions: {
      type: [String], // List of strings for simple RBAC; can be expanded later
      default: [],
    },
    isSystemRole: {
      type: Boolean,
      default: false, // Protect system roles from being deleted
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model('Role', roleSchema);
