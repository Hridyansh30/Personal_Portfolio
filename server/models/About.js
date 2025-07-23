const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String,
  score: String,
});

const aboutSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  hobbies: { type: [String], default: [] },
  goals: { type: [String], default: [] },
  education: { type: [educationSchema], default: [] }
});

module.exports = mongoose.model("About", aboutSchema);
