const jwt = require('jsonwebtoken');
const User = require('../features/user/user.model');
const Franchise = require('../features/franchise/franchise.model');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log('Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Verifying token:', token);

  try {
    // console.log('Verifying token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Token decoded:', decoded);

    const user = await User.findById(decoded.id).populate('role').select('-password');

    const franchise = await Franchise.findOne({ franchiseeId: user._id });

    if (!user) {
      return res.status(401).json({ message: 'User not found or unauthorized' });
    }
    req.user = {
      ...user.toObject(),
      role: decoded.role || user.role?.name, // force use string role
      franchiseId: franchise?._id || null
    };

    // req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
