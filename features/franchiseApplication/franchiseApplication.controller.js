// src/features/franchise/controllers/franchiseApplication.controller.js
const service = require('./franchiseApplication.service');
const User = require('../user/user.model'); // Import User model

exports.applyForFranchise = async (req, res) => {
  try {
    const existing = await service.getApplicationByFranchiseeId(req.user._id);
    if (existing) return res.status(400).json({ message: 'Application already exists' });

  const result = await service.apply({
  franchiseeId: req.user._id,
  region: req.body.region,
  address: req.body.address,
  additionalDetails: req.body.additionalDetails,
  status: 'Not_Applied',
});

    res.status(201).json(result);
  } catch (err) {
    console.error('Apply error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const result = await service.getById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Application not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// exports.changeStatus = async (req, res) => {
//   try {
//     const result = await service.changeStatus(req.params.id, req.body.status);
//     if (!result) return res.status(404).json({ message: 'Application not found' });
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Changing status for:', id, 'to:', status);
    const application = await service.changeStatus(id, status);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    if (application.franchiseeId) {
      await User.findByIdAndUpdate(application.franchiseeId, { franchiseStatus: status });
    } else {
      console.warn('No franchiseeId found on application:', application);
    }

    // Also update user's franchiseStatus
    // await User.findByIdAndUpdate(application.franchiseeId, { franchiseStatus: status });

    res.json(application);
  } catch (err) {
    console.error('Change status error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getMyApplication = async (req, res) => {
  try {
    const app = await service.getApplicationByFranchiseeId(req.user._id);
    if (!app) return res.status(404).json({ message: 'No application found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
