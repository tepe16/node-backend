-- Database Schema untuk Sistem Perpustakaan SMK Yabujah Segeran

CREATE DATABASE IF NOT EXISTS perpustakaan_smk;
USE perpustakaan_smk;

-- Tabel Users (untuk Admin dan Anggota)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'anggota') NOT NULL DEFAULT 'anggota',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Anggota (Data lengkap siswa)
CREATE TABLE anggota (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    nis VARCHAR(20) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    kelas VARCHAR(20),
    jurusan VARCHAR(50),
    no_telp VARCHAR(15),
    alamat TEXT,
    foto_profil VARCHAR(255),
    status ENUM('aktif', 'non-aktif') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel Kategori Buku
CREATE TABLE kategori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_kategori VARCHAR(50) NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Buku
CREATE TABLE buku (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kode_buku VARCHAR(20) UNIQUE NOT NULL,
    judul VARCHAR(200) NOT NULL,
    pengarang VARCHAR(100),
    penerbit VARCHAR(100),
    tahun_terbit YEAR,
    isbn VARCHAR(20),
    kategori_id INT,
    jumlah_total INT NOT NULL DEFAULT 0,
    jumlah_tersedia INT NOT NULL DEFAULT 0,
    lokasi_rak VARCHAR(20),
    deskripsi TEXT,
    cover_buku VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE SET NULL
);

-- Tabel Peminjaman
CREATE TABLE peminjaman (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kode_peminjaman VARCHAR(30) UNIQUE NOT NULL,
    anggota_id INT NOT NULL,
    buku_id INT NOT NULL,
    tanggal_pinjam DATE NOT NULL,
    tanggal_kembali_rencana DATE NOT NULL,
    tanggal_kembali_aktual DATE,
    status ENUM('dipinjam', 'dikembalikan', 'terlambat') DEFAULT 'dipinjam',
    denda DECIMAL(10,2) DEFAULT 0,
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (anggota_id) REFERENCES anggota(id) ON DELETE CASCADE,
    FOREIGN KEY (buku_id) REFERENCES buku(id) ON DELETE CASCADE
);

-- Tabel Pengembalian (History)
CREATE TABLE pengembalian (
    id INT PRIMARY KEY AUTO_INCREMENT,
    peminjaman_id INT NOT NULL,
    tanggal_kembali DATE NOT NULL,
    kondisi_buku ENUM('baik', 'rusak', 'hilang') DEFAULT 'baik',
    denda DECIMAL(10,2) DEFAULT 0,
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (peminjaman_id) REFERENCES peminjaman(id) ON DELETE CASCADE
);

-- Tabel Denda
CREATE TABLE denda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    peminjaman_id INT NOT NULL,
    jumlah_denda DECIMAL(10,2) NOT NULL,
    alasan VARCHAR(100),
    status_bayar ENUM('belum', 'sudah') DEFAULT 'belum',
    tanggal_bayar DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (peminjaman_id) REFERENCES peminjaman(id) ON DELETE CASCADE
);

-- Insert data admin default
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@smkyabujah.sch.id', '$2b$10$rKvVW3HqXhVqP8TQxZ8LReKKJYhYzPqFHKKx3pLQZXGJKH2YhN4Yq', 'admin');
-- Password default: admin123 (harus di-hash dengan bcrypt)

-- Insert kategori default
INSERT INTO kategori (nama_kategori, deskripsi) VALUES
('Fiksi', 'Buku cerita fiksi dan novel'),
('Non-Fiksi', 'Buku pengetahuan umum'),
('Teknologi', 'Buku tentang teknologi dan komputer'),
('Agama', 'Buku-buku keagamaan'),
('Sejarah', 'Buku sejarah dan biografi'),
('Sains', 'Buku ilmu pengetahuan alam');

-- Create indexes untuk performa
CREATE INDEX idx_buku_kode ON buku(kode_buku);
CREATE INDEX idx_anggota_nis ON anggota(nis);
CREATE INDEX idx_peminjaman_status ON peminjaman(status);
CREATE INDEX idx_peminjaman_tanggal ON peminjaman(tanggal_pinjam, tanggal_kembali_rencana);