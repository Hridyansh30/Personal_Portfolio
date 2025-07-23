const express = require("express");
const router = express.Router();
const { sendContactMessage } = require("../controllers/contactController");

// Log and handle contact POST
router.post("/", (req, res, next) => {
  console.log("📩 POST /api/contact hit");
  next();
}, sendContactMessage);

module.exports = router;
