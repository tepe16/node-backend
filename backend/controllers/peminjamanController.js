// ========== controllers/peminjamanController.js ==========

// ⚠️ IMPORT YANG BENAR - sesuaikan dengan struktur model Anda
const Peminjaman = require("../models/Peminjaman"); // Import Peminjaman
const Buku = require("../models/Buku"); // Import Buku - pastikan ada file ini
const Anggota = require("../models/Anggota");
const moment = require("moment");

exports.createPeminjaman = async (req, res) => {
  try {
    const {
      anggota_id,
      buku_id,
      tanggal_pinjam,
      tanggal_kembali_rencana,
      keterangan,
    } = req.body;

    // Cek ketersediaan buku
    const buku = await Buku.findById(buku_id);
    if (!buku || buku.jumlah_tersedia < 1) {
      return res.status(400).json({ message: "Buku tidak tersedia" });
    }

    // Generate kode peminjaman
    const kode = `PJM-${Date.now()}`;

    const result = await Peminjaman.create({
      kode_peminjaman: kode,
      anggota_id,
      buku_id,
      tanggal_pinjam,
      tanggal_kembali_rencana,
      status: "dipinjam",
      keterangan,
    });

    // Kurangi stok buku
    await Buku.updateStok(buku_id, -1);

    res
      .status(201)
      .json({ message: "Peminjaman berhasil dicatat", id: result.insertId });
  } catch (error) {
    console.error("Error createPeminjaman:", error);
    res
      .status(500)
      .json({ message: "Gagal mencatat peminjaman", error: error.message });
  }
};

exports.getAllPeminjaman = async (req, res) => {
  try {
    const { status, anggota_id } = req.query;

    // Cek peminjaman terlambat
    await Peminjaman.checkTerlambat();

    const peminjaman = await Peminjaman.getAll(status, anggota_id);

    // Pastikan return array
    const data = peminjaman || [];

    res.json({ data: data, count: data.length });
  } catch (error) {
    console.error("Error getAllPeminjaman:", error);
    res.status(500).json({
      message: "Gagal mengambil data peminjaman",
      error: error.message,
    });
  }
};

exports.getPeminjamanById = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findById(req.params.id);
    if (!peminjaman) {
      return res
        .status(404)
        .json({ message: "Data peminjaman tidak ditemukan" });
    }
    res.json({ data: peminjaman });
  } catch (error) {
    console.error("Error getPeminjamanById:", error);
    res.status(500).json({
      message: "Gagal mengambil data peminjaman",
      error: error.message,
    });
  }
};

exports.pengembalianBuku = async (req, res) => {
  try {
    const { kondisi } = req.body;

    const peminjaman = await Peminjaman.findById(req.params.id);
    if (!peminjaman) {
      return res
        .status(404)
        .json({ message: "Data peminjaman tidak ditemukan" });
    }

    // ✅ TARUH DI SINI
    console.log("STATUS DB:", peminjaman.status);

    if (peminjaman.status === "dikembalikan") {
      return res.status(400).json({
        message: `Buku "${peminjaman.judul}" sudah dikembalikan`,
      });
    }

    const tanggal_kembali = moment().format("YYYY-MM-DD");
    const tanggal_rencana = moment(peminjaman.tanggal_kembali_rencana);

    const selisih_hari = moment(tanggal_kembali).diff(tanggal_rencana, "days");
    const hari_terlambat = selisih_hari > 0 ? selisih_hari : 0;

    const denda = hari_terlambat * 1000;

    // ✅ update peminjaman
    await Peminjaman.updateStatus(
      req.params.id,
      "dikembalikan",
      tanggal_kembali,
      denda,
    );

    // ✅ update buku (PAKAI MODEL ✅)
    if (kondisi === "baik") {
      await Buku.updateStok(peminjaman.buku_id, 1);
    }

    if (kondisi === "rusak") {
      await Buku.tambahRusak(peminjaman.buku_id);
    }

    if (kondisi === "hilang") {
      await Buku.tambahHilang(peminjaman.buku_id);
    }

    // let suspendHari = 0;

    // if (hari_terlambat > 7) {
    //   suspendHari = 14;
    // }

    // if (kondisi === "rusak") {
    //   suspendHari = 7;
    // }

    // if (kondisi === "hilang") {
    //   suspendHari = 30;
    // }

    let suspendHari = 0;

    if (hari_terlambat > 7) {
      suspendHari = Math.max(suspendHari, 14);
    }

    if (kondisi === "rusak") {
      suspendHari = Math.max(suspendHari, 7);
    }

    if (kondisi === "hilang") {
      suspendHari = Math.max(suspendHari, 30);
    }

    if (suspendHari > 0) {
      const suspendDate = moment()
        .add(suspendHari, "days")
        .format("YYYY-MM-DD");

      await Anggota.setSuspend(peminjaman.anggota_id, suspendDate); // ✅ pakai model
    }

    res.json({
      message: "Pengembalian berhasil dicatat",
      denda,
      hari_terlambat,
      suspend_hari: suspendHari,
    });
  } catch (error) {
    console.error("Error pengembalianBuku:", error);
    res
      .status(500)
      .json({ message: "Gagal mencatat pengembalian", error: error.message });
  }
};

module.exports = exports;
