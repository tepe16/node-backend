// ========== routes/laporanRoutes.js ==========
const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', authenticate, isAdmin, laporanController.getDashboardStats);
router.get('/peminjaman', authenticate, isAdmin, laporanController.getLaporanPeminjaman);
router.get('/buku-populer', authenticate, isAdmin, laporanController.getBukuPopuler);
router.get('/denda', authenticate, isAdmin, laporanController.getLaporanDenda);

module.exports = router;
