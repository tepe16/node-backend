-- ========================================
-- DUMMY DATA BUKU UNTUK PERPUSTAKAAN SMK
-- ========================================

-- KATEGORI TEKNOLOGI (id: 3)
INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) VALUES
('BK-TK-001', 'Pemrograman Web dengan HTML, CSS, dan JavaScript', 'Budi Raharjo', 'Informatika', 2023, '978-602-1234-56-7', 3, 15, 15, 'Rak A-1', 'Buku panduan lengkap untuk belajar pemrograman web dari dasar hingga mahir', NULL),
('BK-TK-002', 'Database MySQL untuk Pemula', 'Andi Prasetyo', 'Andi Publisher', 2023, '978-602-5678-90-1', 3, 12, 12, 'Rak A-1', 'Panduan praktis mengelola database MySQL untuk aplikasi web', NULL),
('BK-TK-003', 'Jaringan Komputer dan Internet', 'Ir. Sutedjo Dharma', 'Elex Media', 2022, '978-602-9876-54-3', 3, 10, 10, 'Rak A-2', 'Konsep dasar jaringan komputer, protokol, dan konfigurasi', NULL),
('BK-TK-004', 'Pemrograman Python untuk Data Science', 'Dr. Romi Satria', 'Gramedia', 2024, '978-602-3456-78-9', 3, 8, 8, 'Rak A-2', 'Belajar Python untuk analisis data dan machine learning', NULL),
('BK-TK-005', 'Desain Grafis dengan Adobe Photoshop', 'Yudhi Purwanto', 'Informatika', 2023, '978-602-7890-12-3', 3, 10, 10, 'Rak A-3', 'Tutorial lengkap desain grafis menggunakan Photoshop', NULL),
('BK-TK-006', 'Microsoft Office untuk Administrasi Perkantoran', 'Siti Nurhaliza', 'Andi Publisher', 2023, '978-602-4567-89-0', 3, 20, 20, 'Rak A-3', 'Panduan Microsoft Word, Excel, dan PowerPoint untuk perkantoran', NULL),
('BK-TK-007', 'Pemrograman Mobile dengan Flutter', 'Agus Saputra', 'Elex Media', 2024, '978-602-6789-01-2', 3, 8, 8, 'Rak A-4', 'Membuat aplikasi mobile Android dan iOS dengan Flutter', NULL),
('BK-TK-008', 'Keamanan Jaringan dan Cyber Security', 'Bambang Kesuma', 'Informatika', 2023, '978-602-8901-23-4', 3, 6, 6, 'Rak A-4', 'Panduan keamanan jaringan dan perlindungan dari serangan cyber', NULL);

-- KATEGORI NON-FIKSI (id: 2)
INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) VALUES
('BK-NF-001', 'Matematika SMK Kelas X', 'Tim Guru Matematika', 'Erlangga', 2023, '978-602-1111-22-3', 2, 30, 30, 'Rak B-1', 'Buku paket Matematika untuk siswa SMK kelas X', NULL),
('BK-NF-002', 'Bahasa Indonesia SMK Kelas XI', 'Dr. Siti Aminah', 'Erlangga', 2023, '978-602-2222-33-4', 2, 30, 30, 'Rak B-1', 'Buku paket Bahasa Indonesia untuk siswa SMK kelas XI', NULL),
('BK-NF-003', 'Bahasa Inggris SMK Kelas XII', 'Prof. John Anderson', 'Erlangga', 2023, '978-602-3333-44-5', 2, 30, 30, 'Rak B-2', 'Buku paket Bahasa Inggris untuk siswa SMK kelas XII', NULL),
('BK-NF-004', 'Kewirausahaan dan Bisnis', 'Hendra Wirawan', 'Yudhistira', 2024, '978-602-4444-55-6', 2, 15, 15, 'Rak B-2', 'Panduan memulai bisnis dan mengembangkan jiwa entrepreneur', NULL),
('BK-NF-005', 'Manajemen Proyek dan Organisasi', 'Ir. Budiman', 'Andi Publisher', 2023, '978-602-5555-66-7', 2, 10, 10, 'Rak B-3', 'Konsep manajemen proyek untuk dunia industri', NULL),
('BK-NF-006', 'Etika Profesi dan Hukum Ketenagakerjaan', 'Dr. Ahmad Hidayat', 'Gramedia', 2023, '978-602-6666-77-8', 2, 12, 12, 'Rak B-3', 'Panduan etika profesi dan peraturan ketenagakerjaan', NULL);

-- KATEGORI SAINS (id: 6)
INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) VALUES
('BK-SI-001', 'Fisika Dasar untuk SMK', 'Prof. Dr. Yohanes Surya', 'Erlangga', 2023, '978-602-7777-88-9', 6, 25, 25, 'Rak C-1', 'Konsep fisika dasar dan aplikasinya dalam kehidupan', NULL),
('BK-SI-002', 'Kimia Industri', 'Dr. Ratna Sari', 'Andi Publisher', 2023, '978-602-8888-99-0', 6, 15, 15, 'Rak C-1', 'Kimia dasar dan aplikasinya di industri', NULL),
('BK-SI-003', 'Biologi dan Kesehatan Kerja', 'dr. Fitria Kusuma', 'Gramedia', 2024, '978-602-9999-00-1', 6, 12, 12, 'Rak C-2', 'Pengetahuan biologi dasar dan kesehatan di lingkungan kerja', NULL),
('BK-SI-004', 'Elektronika Dasar', 'Ir. Wahyu Hidayat', 'Elex Media', 2023, '978-602-0000-11-2', 6, 18, 18, 'Rak C-2', 'Konsep dasar elektronika dan komponen elektronik', NULL);

-- KATEGORI FIKSI (id: 1)
INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) VALUES
('BK-FK-001', 'Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, '978-979-3062-79-2', 1, 10, 10, 'Rak D-1', 'Novel inspiratif tentang pendidikan di Belitung', NULL),
('BK-FK-002', 'Sang Pemimpi', 'Andrea Hirata', 'Bentang Pustaka', 2006, '978-979-3062-92-1', 1, 8, 8, 'Rak D-1', 'Kelanjutan kisah Laskar Pelangi tentang mimpi dan perjuangan', NULL),
('BK-FK-003', 'Bumi Manusia', 'Pramoedya Ananta Toer', 'Lentera Dipantara', 2005, '978-979-3780-03-0', 1, 12, 12, 'Rak D-2', 'Novel sejarah tentang perjuangan masa kolonial', NULL),
('BK-FK-004', 'Negeri 5 Menara', 'Ahmad Fuadi', 'Gramedia', 2009, '978-979-22-5090-4', 1, 10, 10, 'Rak D-2', 'Kisah inspiratif tentang pendidikan pesantren', NULL),
('BK-FK-005', 'Ronggeng Dukuh Paruk', 'Ahmad Tohari', 'Gramedia', 2003, '978-979-22-0274-3', 1, 8, 8, 'Rak D-3', 'Novel tentang kehidupan dan kebudayaan Jawa', NULL);

-- KATEGORI AGAMA (id: 4)
INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) VALUES
('BK-AG-001', 'Pendidikan Agama Islam untuk SMK', 'Drs. H. Abdul Rahman', 'Erlangga', 2023, '978-602-1212-34-5', 4, 35, 35, 'Rak E-1', 'Buku paket Pendidikan Agama Islam untuk SMK', NULL),
('BK-AG-002', 'Akhlak dan Tasawuf', 'KH. Abdullah Gymnastiar', 'Mizan', 2023, '978-602-2323-45-6', 4, 15, 15, 'Rak E-1', 'Panduan akhlak mulia dan kehidupan spiritual', NULL),
('BK-AG-003', 'Fiqih Ibadah', 'Ustadz Adi Hidayat', 'Republika', 2024, '978-602-3434-56-7', 4, 12, 12, 'Rak E-2', 'Panduan lengkap fiqih ibadah sehari-hari', NULL);

-- KATEGORI SEJARAH (id: 5)
INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) VALUES
('BK-SJ-001', 'Sejarah Indonesia Modern', 'Prof. Dr. Anhar Gonggong', 'Erlangga', 2023, '978-602-4545-67-8', 5, 20, 20, 'Rak F-1', 'Sejarah Indonesia dari masa kolonial hingga reformasi', NULL),
('BK-SJ-002', 'Sejarah Perkembangan Teknologi', 'Dr. Bambang Kesuma', 'Gramedia', 2024, '978-602-5656-78-9', 5, 10, 10, 'Rak F-1', 'Evolusi teknologi dari masa ke masa', NULL),
('BK-SJ-003', 'Pahlawan Nasional Indonesia', 'Tim Sejarah Indonesia', 'Yudhistira', 2023, '978-602-6767-89-0', 5, 15, 15, 'Rak F-2', 'Biografi para pahlawan nasional Indonesia', NULL),
('BK-SJ-004', 'Sejarah Dunia Kontemporer', 'Prof. Taufik Abdullah', 'Andi Publisher', 2023, '978-602-7878-90-1', 5, 12, 12, 'Rak F-2', 'Sejarah dunia abad 20 hingga sekarang', NULL);

-- Summary: Total 50 buku
-- Kategori Teknologi: 8 buku
-- Kategori Non-Fiksi: 6 buku
-- Kategori Sains: 4 buku
-- Kategori Fiksi: 5 buku
-- Kategori Agama: 3 buku
-- Kategori Sejarah: 4 buku