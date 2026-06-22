// ========== models/Buku.js ==========
const db = require("../config/database"); // pastikan path sesuai
class Buku {
  static async create(bukuData) {
    const [result] = await db.query(
      `INSERT INTO buku (kode_buku, judul, pengarang, penerbit, tahun_terbit, isbn, 
       kategori_id, jumlah_total, jumlah_tersedia, lokasi_rak, deskripsi, cover_buku) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bukuData.kode_buku,
        bukuData.judul,
        bukuData.pengarang,
        bukuData.penerbit,
        bukuData.tahun_terbit,
        bukuData.isbn,
        bukuData.kategori_id,
        bukuData.jumlah_total,
        bukuData.jumlah_tersedia,
        bukuData.lokasi_rak,
        bukuData.deskripsi,
        bukuData.cover_buku,
      ],
    );
    return result;
  }

  static async findByKode(kode_buku) {
    const [rows] = await db.query(
      `SELECT b.*, k.nama_kategori 
       FROM buku b 
       LEFT JOIN kategori k ON b.kategori_id = k.id 
       WHERE b.kode_buku = ?`,
      [kode_buku],
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT b.*, k.nama_kategori 
       FROM buku b 
       LEFT JOIN kategori k ON b.kategori_id = k.id 
       WHERE b.id = ?`,
      [id],
    );
    return rows[0];
  }

  static async getAll(kategori_id = null, search = null) {
    let query = `SELECT b.*, k.nama_kategori 
                 FROM buku b 
                 LEFT JOIN kategori k ON b.kategori_id = k.id 
                 WHERE 1=1`;
    const params = [];

    if (kategori_id) {
      query += " AND b.kategori_id = ?";
      params.push(kategori_id);
    }

    if (search) {
      query +=
        " AND (b.judul LIKE ? OR b.pengarang LIKE ? OR b.kode_buku LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += " ORDER BY b.created_at DESC";
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async update(id, bukuData) {
    const [result] = await db.query(
      `UPDATE buku SET judul = ?, pengarang = ?, penerbit = ?, tahun_terbit = ?, 
       isbn = ?, kategori_id = ?, jumlah_total = ?, jumlah_tersedia = ?, 
       lokasi_rak = ?, deskripsi = ? WHERE id = ?`,
      [
        bukuData.judul,
        bukuData.pengarang,
        bukuData.penerbit,
        bukuData.tahun_terbit,
        bukuData.isbn,
        bukuData.kategori_id,
        bukuData.jumlah_total,
        bukuData.jumlah_tersedia,
        bukuData.lokasi_rak,
        bukuData.deskripsi,
        id,
      ],
    );
    return result;
  }

  static async updateStok(id, perubahan) {
    const [result] = await db.query(
      "UPDATE buku SET jumlah_tersedia = jumlah_tersedia + ? WHERE id = ?",
      [perubahan, id],
    );
    return result;
  }

  static async tambahRusak(id) {
    const [result] = await db.query(
      "UPDATE buku SET jumlah_rusak = jumlah_rusak + 1 WHERE id = ?",
      [id],
    );
    return result;
  }

  static async tambahHilang(id) {
    const [result] = await db.query(
      "UPDATE buku SET jumlah_hilang = jumlah_hilang + 1 WHERE id = ?",
      [id],
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM buku WHERE id = ?", [id]);
    return result;
  }
}

module.exports = Buku;
