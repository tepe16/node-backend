// ========== middleware/uploadMiddleware.js ==========
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder upload ada
const uploadDirs = ['uploads/buku', 'uploads/anggota'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage untuk cover buku
const bukuStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/buku/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'buku-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Storage untuk foto anggota
const anggotaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/anggota/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'anggota-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter file gambar
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar'), false);
  }
};

const uploadBukuCover = multer({
  storage: bukuStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadAnggotaFoto = multer({
  storage: anggotaStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = { uploadBukuCover, uploadAnggotaFoto };
