const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const protect = require("../middleware/protect");

// Public Route
router.get("/", projectController.getProjects);

router.post("/add", protect, projectController.addProject);
router.delete("/delete/:id", protect, projectController.deleteProject);
router.patch("/update/:id", protect, projectController.updateProject);

module.exports = router;
