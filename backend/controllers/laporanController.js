// ========== controllers/laporanController.js ==========
const db = require('../config/database');

exports.getDashboardStats = async (req, res) => {
  try {
    // Total buku
    const [totalBuku] = await db.query('SELECT COUNT(*) as total FROM buku');

    // Total anggota aktif
    const [totalAnggota] = await db.query(
      "SELECT COUNT(*) as total FROM anggota WHERE status = 'aktif'"
    );

    // Total peminjaman aktif
    const [totalPeminjamanAktif] = await db.query(
      "SELECT COUNT(*) as total FROM peminjaman WHERE status = 'dipinjam'"
    );

    // Total peminjaman terlambat
    const [totalTerlambat] = await db.query(
      "SELECT COUNT(*) as total FROM peminjaman WHERE status = 'terlambat'"
    );

    // Buku tersedia
    const [bukuTersedia] = await db.query('SELECT SUM(jumlah_tersedia) as total FROM buku');

    // Total denda belum dibayar
    const [totalDenda] = await db.query(
      "SELECT SUM(denda) as total FROM peminjaman WHERE status IN ('terlambat', 'dikembalikan') AND denda > 0"
    );

    res.json({
      data: {
        total_buku: totalBuku[0].total,
        total_anggota: totalAnggota[0].total,
        peminjaman_aktif: totalPeminjamanAktif[0].total,
        peminjaman_terlambat: totalTerlambat[0].total,
        buku_tersedia: bukuTersedia[0].total || 0,
        total_denda: totalDenda[0].total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil statistik', error: error.message });
  }
};

exports.getLaporanPeminjaman = async (req, res) => {
  try {
    const { start_date, end_date, status } = req.query;

    let query = `
      SELECT p.*, b.judul, b.kode_buku, a.nama_lengkap, a.nis, a.kelas
      FROM peminjaman p
      JOIN buku b ON p.buku_id = b.id
      JOIN anggota a ON p.anggota_id = a.id
      WHERE 1=1
    `;
    const params = [];

    if (start_date) {
      query += ' AND p.tanggal_pinjam >= ?';
      params.push(start_date);
    }

    if (end_date) {
      query += ' AND p.tanggal_pinjam <= ?';
      params.push(end_date);
    }

    if (status) {
      query += ' AND p.status = ?';
      params.push(status);
    }

    query += ' ORDER BY p.tanggal_pinjam DESC';

    const [rows] = await db.query(query, params);

    res.json({
      data: rows,
      count: rows.length,
      filters: { start_date, end_date, status },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil laporan', error: error.message });
  }
};

exports.getBukuPopuler = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const [rows] = await db.query(
      `
      SELECT b.id, b.judul, b.pengarang, b.kode_buku, k.nama_kategori,
             COUNT(p.id) as total_peminjaman
      FROM buku b
      LEFT JOIN peminjaman p ON b.id = p.buku_id
      LEFT JOIN kategori k ON b.kategori_id = k.id
      GROUP BY b.id
      ORDER BY total_peminjaman DESC
      LIMIT ?
    `,
      [parseInt(limit)]
    );

    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil buku populer', error: error.message });
  }
};

exports.getLaporanDenda = async (req, res) => {
  try {
    const { status_bayar } = req.query;

    let query = `
      SELECT p.*, b.judul, a.nama_lengkap, a.nis
      FROM peminjaman p
      JOIN buku b ON p.buku_id = b.id
      JOIN anggota a ON p.anggota_id = a.id
      WHERE p.denda > 0
    `;

    const params = [];

    if (status_bayar) {
      query += ' AND p.status = ?';
      params.push(status_bayar === 'sudah' ? 'dikembalikan' : 'terlambat');
    }

    query += ' ORDER BY p.denda DESC';

    const [rows] = await db.query(query, params);

    // Total denda
    const totalDenda = rows.reduce((sum, item) => sum + parseFloat(item.denda), 0);

    res.json({
      data: rows,
      total_denda: totalDenda,
      count: rows.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil laporan denda', error: error.message });
  }
};

module.exports = exports;
