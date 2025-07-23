const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: Number, // percentage or numeric level
    required: true,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    default: "General",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
