// ================= server.js =================
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Koneksi database
const db = require("./config/database"); // sesuaikan pathnya

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS spesifik frontend Vite
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: "*",
  }),
);

// Static files untuk upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= Logging Middleware =================
// Middleware untuk log semua request
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl} - Body:`, req.body);
  next();
});

// Import routes
// Tambahkan di server.js setelah route lainnya
const authRoutes = require("./routes/authRoutes");
const bukuRoutes = require("./routes/bukuRoutes");
const anggotaRoutes = require("./routes/anggotaRoutes");
const peminjamanRoutes = require("./routes/peminjamanRoutes");
const laporanRoutes = require("./routes/laporanRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/buku", bukuRoutes);
app.use("/api/anggota", anggotaRoutes);
app.use("/api/peminjaman", peminjamanRoutes);
app.use("/api/laporan", laporanRoutes);

// ================= Root Dashboard =================
app.get("/", async (req, res) => {
  const endpoints = {
    auth: "/api/auth",
    buku: "/api/buku",
    anggota: "/api/anggota",
    peminjaman: "/api/peminjaman",
    laporan: "/api/laporan",
  };

  let endpointRows = "";
  for (const [name, url] of Object.entries(endpoints)) {
    endpointRows += `<tr><td>${name}</td><td>${url}</td></tr>`;
  }

  let tableRows = "";
  let dbName = process.env.DB_NAME || "Unknown";
  let tableCount = 0;
  let dbStatus = "Terkoneksi";
  try {
    const [rows] = await db.query("SHOW TABLES");
    const tableColumn = Object.keys(rows[0])[0];
    tableCount = rows.length;
    rows.forEach((row) => {
      tableRows += `<tr><td>${row[tableColumn]}</td></tr>`;
    });
  } catch (err) {
    console.error("Gagal mengambil tabel:", err);
    tableRows = `<tr><td colspan="1">Gagal mengambil tabel: ${err.message}</td></tr>`;
    dbStatus = "Tidak Terkoneksi";
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard Sistem Perpustakaan</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
        .container { max-width: 1200px; margin: auto; padding: 20px; }
        h1 { text-align: center; color: #2c3e50; margin-bottom: 30px; }
        .cards { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 40px; }
        .card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); flex: 1 1 200px; }
        .card h3 { margin: 0 0 10px; color: #34495e; }
        .card p { font-size: 1.2rem; color: #16a085; margin: 0; }
        table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ecf0f1; }
        th { background: #2980b9; color: #fff; }
        tr:hover { background: #ecf0f1; }
        h2 { color: #2c3e50; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Backend Sistem Perpustakaan SMK Yabujah Segeran</h1>

        <div class="cards">
          <div class="card">
            <h3>Nama Database</h3>
            <p>${dbName}</p>
          </div>
          <div class="card">
            <h3>Jumlah Tabel</h3>
            <p>${tableCount}</p>
          </div>
          <div class="card">
            <h3>Status Koneksi</h3>
            <p>${dbStatus}</p>
          </div>
        </div>

        <h2>Daftar Endpoint API</h2>
        <table>
          <thead>
            <tr><th>Nama Endpoint</th><th>URL</th></tr>
          </thead>
          <tbody>
            ${endpointRows}
          </tbody>
        </table>

        <h2>Daftar Tabel di Database</h2>
        <table>
          <thead>
            <tr><th>Nama Tabel</th></tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// ================= Error handling =================
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  res.status(err.status || 500).json({
    message: err.message || "Terjadi kesalahan server",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// 404 handler
app.use((req, res) => {
  console.warn(`[WARN] 404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// ================= Start server =================
app.listen(PORT, () => {
  console.log(`
═══════════════════════════════════════════
✅ Sistem Perpustakaan SMK Yabujah Segeran               
✅ Server berjalan di http://localhost:${PORT}             
✅ Environment: ${process.env.NODE_ENV || "development"}  
═══════════════════════════════════════════
  `);
});
