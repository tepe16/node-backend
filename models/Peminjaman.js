// ========== models/Peminjaman.js ==========
const db = require("../config/database"); // pastikan path sesuai

class Peminjaman {
  static async create(peminjamanData) {
    const [result] = await db.query(
      `INSERT INTO peminjaman (kode_peminjaman, anggota_id, buku_id, tanggal_pinjam, 
       tanggal_kembali_rencana, status, keterangan) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        peminjamanData.kode_peminjaman,
        peminjamanData.anggota_id,
        peminjamanData.buku_id,
        peminjamanData.tanggal_pinjam,
        peminjamanData.tanggal_kembali_rencana,
        peminjamanData.status,
        peminjamanData.keterangan,
      ],
    );
    return result;
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT p.*, b.judul, b.pengarang, b.kode_buku, 
       a.nama_lengkap, a.nis, a.kelas 
       FROM peminjaman p 
       JOIN buku b ON p.buku_id = b.id 
       JOIN anggota a ON p.anggota_id = a.id 
       WHERE p.id = ?`,
      [id],
    );
    return rows[0];
  }

  static async getAll(status = null, anggota_id = null) {
    let query = `SELECT p.*, b.judul, b.kode_buku, a.nama_lengkap, a.nis 
                 FROM peminjaman p 
                 JOIN buku b ON p.buku_id = b.id 
                 JOIN anggota a ON p.anggota_id = a.id 
                 WHERE 1=1`;
    const params = [];

    if (status) {
      query += " AND p.status = ?";
      params.push(status);
    }

    if (anggota_id) {
      query += " AND p.anggota_id = ?";
      params.push(anggota_id);
    }

    query += " ORDER BY p.created_at DESC";
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async updateStatus(
    id,
    status,
    tanggal_kembali_aktual = null,
    denda = 0,
  ) {
    const [result] = await db.query(
      "UPDATE peminjaman SET status = ?, tanggal_kembali_aktual = ?, denda = ? WHERE id = ?",
      [status, tanggal_kembali_aktual, denda, id],
    );
    return result;
  }

  static async checkTerlambat() {
    const [result] = await db.query(
      `UPDATE peminjaman SET status = 'terlambat' 
       WHERE status = 'dipinjam' AND tanggal_kembali_rencana < CURDATE()`,
    );
    return result;
  }
}
module.exports = Peminjaman;
