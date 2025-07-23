const express = require("express");
const { getSkills, addSkill, updateSkillLevel, deleteSkill } = require("../controllers/skillController");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/", getSkills);
router.post("/add", protect, addSkill);
router.patch("/level/update/:id", protect, updateSkillLevel);
router.delete("/delete/:id", protect, deleteSkill);

module.exports = router;
