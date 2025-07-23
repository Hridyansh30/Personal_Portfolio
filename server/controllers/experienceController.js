const Experience = require("../models/Experience");

// Get all experiences
exports.getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch {
    res.status(500).json({ message: "Failed to load experiences" });
  }
};

// Add a new experience
exports.addExperience = async (req, res) => {
  const { title, company, mentor, duration, description, tech } = req.body;
  try {
    const newExperience = new Experience({ title, company, mentor, duration, description, tech });
    await newExperience.save();
    res.status(201).json({ message: "Experience added successfully" });
  } catch {
    res.status(500).json({ message: "Failed to add experience" });
  }
};

// Update experience by ID
exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { title, company, mentor, duration, description, tech } = req.body;
  try {
    await Experience.findByIdAndUpdate(id, { title, company, mentor, duration, description, tech });
    res.json({ message: "Experience updated successfully" });
  } catch {
    res.status(500).json({ message: "Failed to update experience" });
  }
};

// Delete experience by ID
exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await Experience.findByIdAndDelete(id);
    res.json({ message: "Experience deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete experience" });
  }
};
