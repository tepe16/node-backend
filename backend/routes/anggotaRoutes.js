// ========== routes/anggotaRoutes.js ==========
const express = require('express');
const router = express.Router();
const anggotaController = require('../controllers/anggotaController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Admin only
router.post('/', authenticate, isAdmin, anggotaController.create); // create anggota
router.get('/', authenticate, isAdmin, anggotaController.getAllAnggota);
router.get('/:id', authenticate, isAdmin, anggotaController.getAnggotaById);
router.put('/:id', authenticate, isAdmin, anggotaController.updateAnggota);
router.delete('/:id', authenticate, isAdmin, anggotaController.deleteAnggota);

module.exports = router;
