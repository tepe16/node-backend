-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 24, 2025 at 02:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan_smk`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota`
--

CREATE TABLE `anggota` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nis` varchar(20) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `kelas` varchar(20) DEFAULT NULL,
  `jurusan` varchar(50) DEFAULT NULL,
  `no_telp` varchar(15) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `status` enum('aktif','non-aktif') DEFAULT 'aktif',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anggota`
--

INSERT INTO `anggota` (`id`, `user_id`, `nis`, `nama_lengkap`, `kelas`, `jurusan`, `no_telp`, `alamat`, `foto_profil`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, '5200411293', 'Dimas Permana Putra', 'X-9', 'Informatika', '08123123123', 'Bandung', NULL, 'aktif', '2025-11-23 15:49:24', '2025-11-23 19:05:40'),
(3, 7, '5210311043', 'akbar arazy', 'X-10', 'IPS', '08123123888', 'Yogyakarta', NULL, 'aktif', '2025-11-23 22:46:39', '2025-11-23 22:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id` int(11) NOT NULL,
  `kode_buku` varchar(20) NOT NULL,
  `judul` varchar(200) NOT NULL,
  `pengarang` varchar(100) DEFAULT NULL,
  `penerbit` varchar(100) DEFAULT NULL,
  `tahun_terbit` year(4) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `jumlah_total` int(11) NOT NULL DEFAULT 0,
  `jumlah_tersedia` int(11) NOT NULL DEFAULT 0,
  `lokasi_rak` varchar(20) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `cover_buku` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id`, `kode_buku`, `judul`, `pengarang`, `penerbit`, `tahun_terbit`, `isbn`, `kategori_id`, `jumlah_total`, `jumlah_tersedia`, `lokasi_rak`, `deskripsi`, `cover_buku`, `created_at`, `updated_at`) VALUES
(1, 'BK-TK-001', 'Pemrograman Web dengan HTML, CSS, dan JavaScript', 'Budi Raharjo', 'Informatika', '2023', '978-602-1234-56-7', 3, 15, 15, 'Rak A-1', 'Buku panduan lengkap untuk belajar pemrograman web dari dasar hingga mahir', NULL, '2025-11-23 19:31:29', '2025-11-24 00:09:48'),
(2, 'BK-TK-002', 'Database MySQL untuk Pemula', 'Andi Prasetyo', 'Andi Publisher', '2023', '978-602-5678-90-1', 3, 12, 12, 'Rak A-1', 'Panduan praktis mengelola database MySQL untuk aplikasi web', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(3, 'BK-TK-003', 'Jaringan Komputer dan Internet', 'Ir. Sutedjo Dharma', 'Elex Media', '2022', '978-602-9876-54-3', 3, 10, 10, 'Rak A-2', 'Konsep dasar jaringan komputer, protokol, dan konfigurasi', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(4, 'BK-TK-004', 'Pemrograman Python untuk Data Science', 'Dr. Romi Satria', 'Gramedia', '2024', '978-602-3456-78-9', 3, 8, 7, 'Rak A-2', 'Belajar Python untuk analisis data dan machine learning', NULL, '2025-11-23 19:31:29', '2025-11-23 19:32:42'),
(5, 'BK-TK-005', 'Desain Grafis dengan Adobe Photoshop', 'Yudhi Purwanto', 'Informatika', '2023', '978-602-7890-12-3', 3, 10, 10, 'Rak A-3', 'Tutorial lengkap desain grafis menggunakan Photoshop', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(6, 'BK-TK-006', 'Microsoft Office untuk Administrasi Perkantoran', 'Siti Nurhaliza', 'Andi Publisher', '2023', '978-602-4567-89-0', 3, 20, 20, 'Rak A-3', 'Panduan Microsoft Word, Excel, dan PowerPoint untuk perkantoran', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(7, 'BK-TK-007', 'Pemrograman Mobile dengan Flutter', 'Agus Saputra', 'Elex Media', '2024', '978-602-6789-01-2', 3, 8, 8, 'Rak A-4', 'Membuat aplikasi mobile Android dan iOS dengan Flutter', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(8, 'BK-TK-008', 'Keamanan Jaringan dan Cyber Security', 'Bambang Kesuma', 'Informatika', '2023', '978-602-8901-23-4', 3, 6, 6, 'Rak A-4', 'Panduan keamanan jaringan dan perlindungan dari serangan cyber', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(9, 'BK-NF-001', 'Matematika SMK Kelas X', 'Tim Guru Matematika', 'Erlangga', '2023', '978-602-1111-22-3', 2, 30, 30, 'Rak B-1', 'Buku paket Matematika untuk siswa SMK kelas X', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(10, 'BK-NF-002', 'Bahasa Indonesia SMK Kelas XI', 'Dr. Siti Aminah', 'Erlangga', '2023', '978-602-2222-33-4', 2, 30, 30, 'Rak B-1', 'Buku paket Bahasa Indonesia untuk siswa SMK kelas XI', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(11, 'BK-NF-003', 'Bahasa Inggris SMK Kelas XII', 'Prof. John Anderson', 'Erlangga', '2023', '978-602-3333-44-5', 2, 30, 30, 'Rak B-2', 'Buku paket Bahasa Inggris untuk siswa SMK kelas XII', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(12, 'BK-NF-004', 'Kewirausahaan dan Bisnis', 'Hendra Wirawan', 'Yudhistira', '2024', '978-602-4444-55-6', 2, 15, 15, 'Rak B-2', 'Panduan memulai bisnis dan mengembangkan jiwa entrepreneur', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(13, 'BK-NF-005', 'Manajemen Proyek dan Organisasi', 'Ir. Budiman', 'Andi Publisher', '2023', '978-602-5555-66-7', 2, 10, 10, 'Rak B-3', 'Konsep manajemen proyek untuk dunia industri', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(14, 'BK-NF-006', 'Etika Profesi dan Hukum Ketenagakerjaan', 'Dr. Ahmad Hidayat', 'Gramedia', '2023', '978-602-6666-77-8', 2, 12, 12, 'Rak B-3', 'Panduan etika profesi dan peraturan ketenagakerjaan', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(15, 'BK-SI-001', 'Fisika Dasar untuk SMK', 'Prof. Dr. Yohanes Surya', 'Erlangga', '2023', '978-602-7777-88-9', 6, 25, 25, 'Rak C-1', 'Konsep fisika dasar dan aplikasinya dalam kehidupan', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(16, 'BK-SI-002', 'Kimia Industri', 'Dr. Ratna Sari', 'Andi Publisher', '2023', '978-602-8888-99-0', 6, 15, 15, 'Rak C-1', 'Kimia dasar dan aplikasinya di industri', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(17, 'BK-SI-003', 'Biologi dan Kesehatan Kerja', 'dr. Fitria Kusuma', 'Gramedia', '2024', '978-602-9999-00-1', 6, 12, 12, 'Rak C-2', 'Pengetahuan biologi dasar dan kesehatan di lingkungan kerja', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(18, 'BK-SI-004', 'Elektronika Dasar', 'Ir. Wahyu Hidayat', 'Elex Media', '2023', '978-602-0000-11-2', 6, 18, 18, 'Rak C-2', 'Konsep dasar elektronika dan komponen elektronik', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(19, 'BK-FK-001', 'Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', '2005', '978-979-3062-79-2', 1, 10, 10, 'Rak D-1', 'Novel inspiratif tentang pendidikan di Belitung', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(20, 'BK-FK-002', 'Sang Pemimpi', 'Andrea Hirata', 'Bentang Pustaka', '2006', '978-979-3062-92-1', 1, 8, 8, 'Rak D-1', 'Kelanjutan kisah Laskar Pelangi tentang mimpi dan perjuangan', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(21, 'BK-FK-003', 'Bumi Manusia', 'Pramoedya Ananta Toer', 'Lentera Dipantara', '2005', '978-979-3780-03-0', 1, 12, 12, 'Rak D-2', 'Novel sejarah tentang perjuangan masa kolonial', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(22, 'BK-FK-004', 'Negeri 5 Menara', 'Ahmad Fuadi', 'Gramedia', '2009', '978-979-22-5090-4', 1, 10, 10, 'Rak D-2', 'Kisah inspiratif tentang pendidikan pesantren', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(23, 'BK-FK-005', 'Ronggeng Dukuh Paruk', 'Ahmad Tohari', 'Gramedia', '2003', '978-979-22-0274-3', 1, 8, 8, 'Rak D-3', 'Novel tentang kehidupan dan kebudayaan Jawa', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(24, 'BK-AG-001', 'Pendidikan Agama Islam untuk SMK', 'Drs. H. Abdul Rahman', 'Erlangga', '2023', '978-602-1212-34-5', 4, 35, 35, 'Rak E-1', 'Buku paket Pendidikan Agama Islam untuk SMK', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(25, 'BK-AG-002', 'Akhlak dan Tasawuf', 'KH. Abdullah Gymnastiar', 'Mizan', '2023', '978-602-2323-45-6', 4, 15, 15, 'Rak E-1', 'Panduan akhlak mulia dan kehidupan spiritual', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(26, 'BK-AG-003', 'Fiqih Ibadah', 'Ustadz Adi Hidayat', 'Republika', '2024', '978-602-3434-56-7', 4, 12, 12, 'Rak E-2', 'Panduan lengkap fiqih ibadah sehari-hari', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(27, 'BK-SJ-001', 'Sejarah Indonesia Modern', 'Prof. Dr. Anhar Gonggong', 'Erlangga', '2023', '978-602-4545-67-8', 5, 20, 20, 'Rak F-1', 'Sejarah Indonesia dari masa kolonial hingga reformasi', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(28, 'BK-SJ-002', 'Sejarah Perkembangan Teknologi', 'Dr. Bambang Kesuma', 'Gramedia', '2024', '978-602-5656-78-9', 5, 10, 10, 'Rak F-1', 'Evolusi teknologi dari masa ke masa', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(29, 'BK-SJ-003', 'Pahlawan Nasional Indonesia', 'Tim Sejarah Indonesia', 'Yudhistira', '2023', '978-602-6767-89-0', 5, 15, 15, 'Rak F-2', 'Biografi para pahlawan nasional Indonesia', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29'),
(30, 'BK-SJ-004', 'Sejarah Dunia Kontemporer', 'Prof. Taufik Abdullah', 'Andi Publisher', '2023', '978-602-7878-90-1', 5, 12, 12, 'Rak F-2', 'Sejarah dunia abad 20 hingga sekarang', NULL, '2025-11-23 19:31:29', '2025-11-23 19:31:29');

-- --------------------------------------------------------

--
-- Table structure for table `denda`
--

CREATE TABLE `denda` (
  `id` int(11) NOT NULL,
  `peminjaman_id` int(11) NOT NULL,
  `jumlah_denda` decimal(10,2) NOT NULL,
  `alasan` varchar(100) DEFAULT NULL,
  `status_bayar` enum('belum','sudah') DEFAULT 'belum',
  `tanggal_bayar` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(50) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama_kategori`, `deskripsi`, `created_at`) VALUES
(1, 'Fiksi', 'Buku cerita fiksi dan novel', '2025-11-17 21:32:31'),
(2, 'Non-Fiksi', 'Buku pengetahuan umum', '2025-11-17 21:32:31'),
(3, 'Teknologi', 'Buku tentang teknologi dan komputer', '2025-11-17 21:32:31'),
(4, 'Agama', 'Buku-buku keagamaan', '2025-11-17 21:32:31'),
(5, 'Sejarah', 'Buku sejarah dan biografi', '2025-11-17 21:32:31'),
(6, 'Sains', 'Buku ilmu pengetahuan alam', '2025-11-17 21:32:31');

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL,
  `kode_peminjaman` varchar(30) NOT NULL,
  `anggota_id` int(11) NOT NULL,
  `buku_id` int(11) NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali_rencana` date NOT NULL,
  `tanggal_kembali_aktual` date DEFAULT NULL,
  `status` enum('dipinjam','dikembalikan','terlambat') DEFAULT 'dipinjam',
  `denda` decimal(10,2) DEFAULT 0.00,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjaman`
--

INSERT INTO `peminjaman` (`id`, `kode_peminjaman`, `anggota_id`, `buku_id`, `tanggal_pinjam`, `tanggal_kembali_rencana`, `tanggal_kembali_aktual`, `status`, `denda`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'PJM-1763926362200', 1, 4, '2025-11-24', '2025-12-01', NULL, 'dipinjam', 0.00, '', '2025-11-23 19:32:42', '2025-11-23 19:32:42'),
(2, 'PJM-1763941876298', 3, 1, '2025-11-24', '2025-12-01', '2025-11-24', 'dikembalikan', 0.00, '', '2025-11-23 23:51:16', '2025-11-24 00:09:48');

-- --------------------------------------------------------

--
-- Table structure for table `pengembalian`
--

CREATE TABLE `pengembalian` (
  `id` int(11) NOT NULL,
  `peminjaman_id` int(11) NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `kondisi_buku` enum('baik','rusak','hilang') DEFAULT 'baik',
  `denda` decimal(10,2) DEFAULT 0.00,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','anggota') NOT NULL DEFAULT 'anggota',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(4, 'admin', 'admin@gmail.com', '$2b$10$vlnWCmG/2brspJu4WDP4k.RzmrJtTAbQRGC9qa7W66krxy5S1aDfu', 'admin', '2025-11-17 22:02:08', '2025-11-17 22:02:08'),
(5, 'dimaspmna', 'dimaspmna@gmail.com', '$2b$10$98236s911sgbbxAYGZhXJuWW83ikMaiHSoKDPz5FwwBkBfVo9/x0a', 'anggota', '2025-11-23 15:49:24', '2025-11-23 15:49:24'),
(6, 'permana', 'permana@gmail.com', '$2b$10$ELkemtwGLhHNBLHvuHWKPeCE2Z1Jg3SI7Oz.klL4n77y24SYBg2QK', 'anggota', '2025-11-23 17:25:20', '2025-11-23 17:25:20'),
(7, 'akbar', 'akbar@gmail.com', '$2b$10$2AHxJl1T6swMxfN1IaIM6ul8XSS33xT/slsqy4kzsWIY0L42EGi1O', 'anggota', '2025-11-23 22:46:39', '2025-11-23 22:46:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nis` (`nis`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `idx_anggota_nis` (`nis`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_buku` (`kode_buku`),
  ADD KEY `kategori_id` (`kategori_id`),
  ADD KEY `idx_buku_kode` (`kode_buku`);

--
-- Indexes for table `denda`
--
ALTER TABLE `denda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `peminjaman_id` (`peminjaman_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_peminjaman` (`kode_peminjaman`),
  ADD KEY `anggota_id` (`anggota_id`),
  ADD KEY `buku_id` (`buku_id`),
  ADD KEY `idx_peminjaman_status` (`status`),
  ADD KEY `idx_peminjaman_tanggal` (`tanggal_pinjam`,`tanggal_kembali_rencana`);

--
-- Indexes for table `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `peminjaman_id` (`peminjaman_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota`
--
ALTER TABLE `anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `denda`
--
ALTER TABLE `denda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pengembalian`
--
ALTER TABLE `pengembalian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anggota`
--
ALTER TABLE `anggota`
  ADD CONSTRAINT `anggota_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `denda`
--
ALTER TABLE `denda`
  ADD CONSTRAINT `denda_ibfk_1` FOREIGN KEY (`peminjaman_id`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_ibfk_1` FOREIGN KEY (`anggota_id`) REFERENCES `anggota` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `peminjaman_ibfk_2` FOREIGN KEY (`buku_id`) REFERENCES `buku` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD CONSTRAINT `pengembalian_ibfk_1` FOREIGN KEY (`peminjaman_id`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
