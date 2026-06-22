// ========== controllers/bukuController.js ==========
const Buku = require('../models/Buku');
const Kategori = require('../models/Kategori'); // kalau memang ada file ini

exports.getAllBuku = async (req, res) => {
  try {
    const { kategori_id, search } = req.query;
    const buku = await Buku.getAll(kategori_id, search);
    res.json({ data: buku, count: buku.length });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data buku', error: error.message });
  }
};

exports.getBukuById = async (req, res) => {
  try {
    const buku = await Buku.findById(req.params.id);
    if (!buku) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ data: buku });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data buku', error: error.message });
  }
};

exports.createBuku = async (req, res) => {
  try {
    const bukuData = {
      ...req.body,
      cover_buku: req.file ? req.file.filename : null,
      jumlah_tersedia: req.body.jumlah_total,
    };

    const result = await Buku.create(bukuData);
    res.status(201).json({ message: 'Buku berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan buku', error: error.message });
  }
};

exports.updateBuku = async (req, res) => {
  try {
    const buku = await Buku.findById(req.params.id);
    if (!buku) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    const result = await Buku.update(req.params.id, req.body);
    res.json({ message: 'Buku berhasil diupdate', affectedRows: result.affectedRows });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate buku', error: error.message });
  }
};

exports.deleteBuku = async (req, res) => {
  try {
    const result = await Buku.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus buku', error: error.message });
  }
};

exports.getAllKategori = async (req, res) => {
  try {
    const kategori = await Kategori.getAll();
    res.json({ data: kategori });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil kategori', error: error.message });
  }
};
