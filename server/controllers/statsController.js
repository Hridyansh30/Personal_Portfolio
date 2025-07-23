

const Project = require("../models/Project");
const Experience = require("../models/Experience");
const Skill = require("../models/Skill");
const Contact = require("../models/Contact");


exports.getCounts = async (req, res) => {
    try {
        const projectCount = await Project.countDocuments();
        const experienceCount = await Experience.countDocuments();
        const skillCount = await Skill.countDocuments();
        const contactCount = await Contact.countDocuments();

        res.json({
            projects: projectCount,
            experiences: experienceCount,
            skills: skillCount,
            contacts: contactCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getContacts_year = async (req, res) => {
  const year = parseInt(req.query.year) || new Date.getFullYear();

  if (isNaN(year)) {
    return res.status(400).json({ message: "Invalid year" });
  }

  try {
    const contacts = await Contact.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    const monthlyCounts = Array(12).fill(0);
    contacts.forEach((item) => {
      monthlyCounts[item._id - 1] = item.count;
    });

    res.json(monthlyCounts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getSkills_cat = async (req, res) => {
  try {
    const distribution = await Skill.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json(distribution);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProjects_tech = async (req, res) => {
  try {
    const distribution = await Project.aggregate([
      { $unwind: "$tech" }, // unwind the tech array
      {
        $group: {
          _id: "$tech",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(distribution);
  } catch (err) {
    console.error("Error fetching project tech distribution:", err);
    res.status(500).json({ message: "Server Error" });
  }
};