const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("✅ ROOT HIT");
  res.send("✅ SERVER HIDUP");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server jalan di http://localhost:${PORT}`);
});
