const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    required: "true",
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  intent: { type: String, default: "unknown", trim: true}, // Added intent field
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
