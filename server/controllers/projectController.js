const Project = require("../models/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD a project
exports.addProject = async (req, res) => {
  const { name, description, tech, tags, github, live, image, features } = req.body;
  if (!name || !description) return res.status(400).json({ message: "Name and description are required" });

  try {
    const newProject = new Project({ name, description, tech, tags, github, live, image, features });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Failed to add project" });
  }
};

// DELETE a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete project" });
  }
};

// UPDATE project details
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, updateFields, { new: true });
    res.json(updatedProject);
  } catch {
    res.status(500).json({ message: "Failed to update project" });
  }
};
