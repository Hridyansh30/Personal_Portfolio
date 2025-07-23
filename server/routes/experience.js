const express = require("express");
const router = express.Router();
const { getExperience, addExperience, updateExperience, deleteExperience } = require("../controllers/experienceController");
const protect = require("../middleware/protect");

// Protected Routes
router.get("/", getExperience);
router.post("/add", protect, addExperience);
router.patch("/update/:id", protect, updateExperience);
router.delete("/delete/:id", protect, deleteExperience);

module.exports = router;
