// src/utils/sanitizeUser.js
function sanitizeUser(user) {
  if (!user) return null;
  const { _id, name, email, phone, role, franchiseStatus, isVerified, isActive, createdAt, updatedAt } = user;
  return {
    id: _id,
    name,
    email,
    phone,
    role: {
      name: role?.name,
      description: role?.description
    },
    franchiseStatus,
    isVerified,
    isActive,
    createdAt,
    updatedAt
  };
}

module.exports = sanitizeUser;
