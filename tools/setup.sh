#!/bin/bash

echo "=== Membuat struktur proyek di folder saat ini ==="

# Folder config
mkdir -p config
touch config/database.js

# Folder controllers
mkdir -p controllers
touch controllers/authController.js \
      controllers/bukuController.js \
      controllers/anggotaController.js \
      controllers/peminjamanController.js \
      controllers/laporanController.js

# Folder models
mkdir -p models
touch models/User.js \
      models/Anggota.js \
      models/Buku.js \
      models/Kategori.js \
      models/Peminjaman.js

# Folder routes
mkdir -p routes
touch routes/authRoutes.js \
      routes/bukuRoutes.js \
      routes/anggotaRoutes.js \
      routes/peminjamanRoutes.js \
      routes/laporanRoutes.js

# Folder middleware
mkdir -p middleware
touch middleware/authMiddleware.js \
      middleware/uploadMiddleware.js \
      middleware/validationMiddleware.js

# Folder uploads
mkdir -p uploads/buku uploads/anggota

# File utama
touch .env server.js

echo "Struktur folder dan file berhasil dibuat"
