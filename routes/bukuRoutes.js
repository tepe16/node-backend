// ========== routes/bukuRoutes.js ==========
const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const { uploadBukuCover } = require('../middleware/uploadMiddleware');
const { validateBuku, handleValidationErrors } = require('../middleware/validationMiddleware');

// Public routes (bisa diakses anggota)
router.get('/', authenticate, bukuController.getAllBuku);
router.get('/kategori', authenticate, bukuController.getAllKategori);
router.get('/:id', authenticate, bukuController.getBukuById);

// Admin only routes
router.post(
  '/',
  authenticate,
  isAdmin,
  uploadBukuCover.single('cover_buku'),
  validateBuku,
  handleValidationErrors,
  bukuController.createBuku
);

router.put(
  '/:id',
  authenticate,
  isAdmin,
  validateBuku,
  handleValidationErrors,
  bukuController.updateBuku
);

router.delete('/:id', authenticate, isAdmin, bukuController.deleteBuku);

module.exports = router;
