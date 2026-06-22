// ========== middleware/authMiddleware.js ==========
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak. Admin only.' });
  }
  next();
};

const isAnggota = (req, res, next) => {
  if (req.user.role !== 'anggota') {
    return res.status(403).json({ message: 'Akses ditolak. Anggota only.' });
  }
  next();
};

module.exports = { authenticate, isAdmin, isAnggota };
