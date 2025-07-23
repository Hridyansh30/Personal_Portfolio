// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contactRoute = require("./routes/contact");
const skillRoutes = require("./routes/skill");
const projectRoutes = require("./routes/project");
const experienceRoutes = require("./routes/experience");
const aboutRoutes = require("./routes/about");
const adminRoutes = require("./routes/admin");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.url}`);
  next();
});

app.use(cors()); // allow all origins

app.use(express.json()); // to parse JSON body


// ✅ Contact Route

app.use("/api/contact", contactRoute);

app.use("/api/skills", skillRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/experience", experienceRoutes);

app.use("/api/about", aboutRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/stats", require("./routes/stats")); // Dashboard analytics route

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("Portfolio API running");
});

// ✅ Start Server
mongoose.connect(process.env.MONGO_URI, {
    dbName: "portfolio",
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
