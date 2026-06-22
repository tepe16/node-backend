// ========== routes/peminjamanRoutes.js ==========
const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const {
  validatePeminjaman,
  handleValidationErrors,
} = require('../middleware/validationMiddleware');

// Anggota bisa lihat peminjaman sendiri
router.get('/', authenticate, peminjamanController.getAllPeminjaman);
router.get('/:id', authenticate, peminjamanController.getPeminjamanById);

// Admin only
router.post(
  '/',
  authenticate,
  isAdmin,
  validatePeminjaman,
  handleValidationErrors,
  peminjamanController.createPeminjaman
);

router.put('/:id/kembali', authenticate, isAdmin, peminjamanController.pengembalianBuku);

module.exports = router;
