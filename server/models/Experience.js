const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    mentor: { type: String, default: "" },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: [String], default: [] }, // e.g., ['React', 'Node.js']
    createdAt: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("Experience", experienceSchema);
