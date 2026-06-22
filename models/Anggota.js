const db = require("../config/database"); // pastikan path sesuai

class Anggota {
  static async create(anggotaData) {
    const [result] = await db.query(
      `INSERT INTO anggota (user_id, nis, nama_lengkap, kelas, jurusan, no_telp, alamat, foto_profil, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        anggotaData.user_id,
        anggotaData.nis,
        anggotaData.nama_lengkap,
        anggotaData.kelas,
        anggotaData.jurusan,
        anggotaData.no_telp,
        anggotaData.alamat,
        anggotaData.foto_profil,
        anggotaData.status,
      ],
    );
    return result;
  }

  static async findByNIS(nis) {
    const [rows] = await db.query("SELECT * FROM anggota WHERE nis = ?", [nis]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT a.*, u.username, u.email, u.role 
       FROM anggota a 
       LEFT JOIN users u ON a.user_id = u.id 
       WHERE a.id = ?`,
      [id],
    );
    return rows[0];
  }

  // <-- method baru untuk login anggota
  static async findByUserId(user_id) {
    const [rows] = await db.query(
      `SELECT a.*, u.username, u.email, u.role 
       FROM anggota a 
       LEFT JOIN users u ON a.user_id = u.id 
       WHERE a.user_id = ?`,
      [user_id],
    );
    return rows[0];
  }

  static async getAll(status = null) {
    let query = `SELECT a.*, u.username, u.email 
                 FROM anggota a 
                 LEFT JOIN users u ON a.user_id = u.id`;
    const params = [];

    if (status) {
      query += " WHERE a.status = ?";
      params.push(status);
    }

    query += " ORDER BY a.created_at DESC";
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async update(id, anggotaData) {
    const [result] = await db.query(
      `UPDATE anggota SET nama_lengkap = ?, kelas = ?, jurusan = ?, 
       no_telp = ?, alamat = ?, status = ? WHERE id = ?`,
      [
        anggotaData.nama_lengkap,
        anggotaData.kelas,
        anggotaData.jurusan,
        anggotaData.no_telp,
        anggotaData.alamat,
        anggotaData.status,
        id,
      ],
    );
    return result;
  }

  static async setSuspend(id, tanggal) {
    const [result] = await db.query(
      "UPDATE anggota SET suspended_until = ? WHERE id = ?",
      [tanggal, id],
    );
    return result;
  }

  static async resetSuspend() {
    await db.query(`
    UPDATE anggota
    SET suspended_until = NULL
    WHERE suspended_until < CURDATE()
  `);
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM anggota WHERE id = ?", [id]);
    return result;
  }
}

module.exports = Anggota;
