const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
const protect = require("../middleware/protect");

router.get("/", aboutController.getAbout);
router.patch("/bio/update", protect, aboutController.updateBio);
router.patch("/education/add", protect, aboutController.addEducation);
router.patch("/education/edit", protect, aboutController.editEducation);
router.patch("/education/delete", protect, aboutController.deleteEducation);
router.patch("/hobbies/add", protect, aboutController.addHobby);
router.patch("/hobbies/delete", protect, aboutController.deleteHobby);
router.patch("/goals/add", protect, aboutController.addGoal);
router.patch("/goals/delete", protect, aboutController.deleteGoal);

module.exports = router;