const express = require("express");
const router = express.Router();
const { getCounts, getContacts_year , getSkills_cat, getProjects_tech} = require("../controllers/statsController");
const protect = require("../middleware/protect");

// Stats counts (cards)
router.get("/counts", protect, getCounts);

// Charts data
router.get("/contact-year", protect, getContacts_year);
router.get("/skills-cat", protect, getSkills_cat);
router.get("/projects-tech", protect, getProjects_tech);

module.exports = router;
