// ========== routes/authRoutes.js ==========
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const {
  validateLogin,
  handleValidationErrors,
} = require("../middleware/validationMiddleware");

// Login route (untuk admin & anggota)
router.post("/login", authController.login);

// Profile route (protected)
router.get("/profile", authenticate, authController.getProfile);

module.exports = router;
