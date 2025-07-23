const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");

// Login route
router.post("/login", loginAdmin);

module.exports = router;
