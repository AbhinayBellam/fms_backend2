// middleware/authorize.js
const auth = (...allowedRoles) => {
  return (req, res, next) => {
    // console.log('Checking role:', req.user?.role);
    console.log('User role in auth middleware:', req.user.role, typeof req.user.role);

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

module.exports = auth;
