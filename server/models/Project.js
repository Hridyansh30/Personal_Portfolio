const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tech: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  github: { type: String, default: "" },
  live: { type: String, default: "" },
  image: { type: String, default: "" },
  features: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);
