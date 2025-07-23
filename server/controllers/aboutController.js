const About = require("../models/About");

// GET about data
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "About not found" });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Bio
exports.updateBio = async (req, res) => {
  const { bio } = req.body;
  try {
    const about = await About.findOneAndUpdate({}, { bio }, { new: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Education - Add
exports.addEducation = async (req, res) => {
  const { education } = req.body;
  const { degree, institution, year, score } = education;

  try {
    const about = await About.findOneAndUpdate(
      {},
      { $push: { education: { degree, institution, year, score } } },
      { new: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// Education - Edit
exports.editEducation = async (req, res) => {
  const { index, degree, institution, year, score } = req.body;
  try {
    const about = await About.findOne();
    about.education[index] = { degree, institution, year, score };
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Education - Delete
exports.deleteEducation = async (req, res) => {
  const { index } = req.body;
  try {
    const about = await About.findOne();
    about.education.splice(index, 1);
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Hobbies - Add
exports.addHobby = async (req, res) => {
  const { hobby } = req.body;
  try {
    const about = await About.findOneAndUpdate(
      {},
      { $push: { hobbies: hobby } },
      { new: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Hobbies - Delete
exports.deleteHobby = async (req, res) => {
  const { hobby } = req.body;
  try {
    const about = await About.findOneAndUpdate(
      {},
      { $pull: { hobbies: hobby } },
      { new: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Goals - Add
exports.addGoal = async (req, res) => {
  const { goal } = req.body;
  try {
    const about = await About.findOneAndUpdate(
      {},
      { $push: { goals: goal } },
      { new: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Goals - Delete
exports.deleteGoal = async (req, res) => {
  const { goal } = req.body;
  try {
    const about = await About.findOneAndUpdate(
      {},
      { $pull: { goals: goal } },
      { new: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
