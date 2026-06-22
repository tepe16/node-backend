// ========== controllers/anggotaController.js ==========
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const Anggota = require("../models/Anggota");

exports.create = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      nama_lengkap,
      nis,
      kelas,
      jurusan,
      no_telp,
      alamat,
    } = req.body;

    // cek email sudah ada
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // cek NIS sudah ada
    const existingNIS = await Anggota.findByNIS(nis);
    if (existingNIS) {
      return res.status(400).json({ message: "NIS sudah terdaftar" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user
    const userResult = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "anggota",
    });

    // buat data anggota
    await Anggota.create({
      user_id: userResult.insertId,
      nis,
      nama_lengkap,
      kelas,
      jurusan,
      no_telp,
      alamat,
      status: "aktif",
    });

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Gagal membuat anggota", error: error.message });
  }
};

exports.getAllAnggota = async (req, res) => {
  try {
    const { status } = req.query;
    await Anggota.resetSuspend();

    const anggota = await Anggota.getAll(status);
    res.json({ data: anggota, count: anggota.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data anggota", error: error.message });
  }
};

exports.getAnggotaById = async (req, res) => {
  try {
    const anggota = await Anggota.findById(req.params.id);
    if (!anggota) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }
    res.json({ data: anggota });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data anggota", error: error.message });
  }
};

exports.updateAnggota = async (req, res) => {
  try {
    const result = await Anggota.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }
    res.json({ message: "Data anggota berhasil diupdate" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengupdate anggota", error: error.message });
  }
};

exports.deleteAnggota = async (req, res) => {
  try {
    const result = await Anggota.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }
    res.json({ message: "Anggota berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus anggota", error: error.message });
  }
};
