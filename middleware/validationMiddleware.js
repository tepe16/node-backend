// ========== middleware/validationMiddleware.js ==========
const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username minimal 3 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('nama_lengkap').trim().notEmpty().withMessage('Nama lengkap wajib diisi'),
  body('nis').trim().notEmpty().withMessage('NIS wajib diisi'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi'),
];

const validateBuku = [
  body('kode_buku').trim().notEmpty().withMessage('Kode buku wajib diisi'),
  body('judul').trim().notEmpty().withMessage('Judul wajib diisi'),
  body('jumlah_total').isInt({ min: 0 }).withMessage('Jumlah total harus angka positif'),
  body('jumlah_tersedia').isInt({ min: 0 }).withMessage('Jumlah tersedia harus angka positif'),
];

const validatePeminjaman = [
  body('anggota_id').isInt().withMessage('ID anggota tidak valid'),
  body('buku_id').isInt().withMessage('ID buku tidak valid'),
  body('tanggal_pinjam').isDate().withMessage('Tanggal pinjam tidak valid'),
  body('tanggal_kembali_rencana').isDate().withMessage('Tanggal kembali tidak valid'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateBuku,
  validatePeminjaman,
  handleValidationErrors,
};
