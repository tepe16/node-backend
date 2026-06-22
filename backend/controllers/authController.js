// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const Anggota = require("../models/Anggota"); // ← import benar

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
    );

    // Ambil data anggota jika user.role = 'anggota'
    let anggotaData = null;
    if (user.role === "anggota") {
      anggotaData = await Anggota.findByUserId(user.id); // ← method baru
    }

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        anggota: anggotaData || null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal login", error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let anggotaData = null;
    if (user.role === "anggota") {
      anggotaData = await Anggota.findByUserId(user.id);
    }

    res.json({ user, anggota: anggotaData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Gagal mengambil profil", error: error.message });
  }
};
