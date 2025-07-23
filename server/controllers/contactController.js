const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const { detectIntent } = require('../utils/intentDetector');

exports.sendContactMessage = async (req, res) => {
  console.log("🔔 Received contact form request");

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message)
    return res.status(400).json({ error: 'All fields are required.' });

  try {
    const intent = await detectIntent(message);
    console.log(`🧠 Detected intent: ${intent}`);

    // 1. Save to MongoDB
    const newMessage = new Contact({ name, email, subject, message, intent});
    await newMessage.save();

    // 2. Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS // App Password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name} | Intent: ${intent}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Detected Intent:</strong> ${intent}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: '✅ Message sent and saved successfully.' });
  } catch (err) {
    console.error("❌ Error in sendContactMessage:", err);
    res.status(500).json({ error: err.message || 'Something went wrong.' });
  }
};

