// / ========== models/User.js ==========
const db = require('../config/database');

class User {
  static async create(userData) {
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [userData.username, userData.email, userData.password, userData.role]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async getAll(role = null) {
    let query = 'SELECT id, username, email, role, created_at FROM users';
    const params = [];

    if (role) {
      query += ' WHERE role = ?';
      params.push(role);
    }

    const [rows] = await db.query(query, params);
    return rows;
  }
}
module.exports = { User };
