const Skill = require("../models/Skill");

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};

// Add a new skill
exports.addSkill = async (req, res) => {
  const { name, level, category } = req.body;
  try {
    const newSkill = new Skill({ name, level, category });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Failed to add skill" });
  }
};

// Update skill level only
exports.updateSkillLevel = async (req, res) => {
  const { id } = req.params;
  const { level } = req.body;

  if (level < 0 || level > 100) {
    return res.status(400).json({ message: "Level must be between 0 and 100" });
  }

  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { level },
      { new: true }
    );
    if (!updatedSkill) return res.status(404).json({ message: "Skill not found" });
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Failed to update skill level" });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill" });
  }
};

