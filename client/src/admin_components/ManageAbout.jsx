import React, { useEffect, useState } from "react";
import "./ManageAbout.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast } from "react-toastify";

const ManageAbout = () => {
  const [about, setAbout] = useState(null);
  const [bio, setBio] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    score: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get("https://personal-portfolio-73h0.onrender.com/api/about");
      setAbout(res.data);
      setBio(res.data.bio);
      AOS.refresh();
    } catch {
      toast.error("Failed to fetch about info");
    }
  };

  const updateBio = async () => {
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/bio/update", { bio }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      fetchAbout();
      toast.success("Bio updated");
    } catch {
      toast.error("Error updating bio");
    }
  };

  const addHobby = async () => {
    if (!newHobby) return;
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/hobbies/add", {
        hobby: newHobby,
      }, { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
        });
      setNewHobby("");
      fetchAbout();
      toast.success("Hobby added");
    } catch {
      toast.error("Failed to add hobby");
    }
  };

  const removeHobby = async (hobby) => {
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/hobbies/delete", { hobby }, 
        { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
      });
      fetchAbout();
      toast.success("Hobby removed");
    } catch {
      toast.error("Failed to remove hobby");
    }
  };

  const addGoal = async () => {
    if (!newGoal) return;
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/goals/add", {
        goal: newGoal
      }, { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
      });
      setNewGoal("");
      fetchAbout();
      toast.success("Goal added");
    } catch {
      toast.error("Failed to add goal");
    }
  };

  const removeGoal = async (goal) => {
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/goals/delete", {
        goal
      }, { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
      });
      fetchAbout();
      toast.success("Goal removed");
    } catch {
      toast.error("Failed to remove goal");
    }
  };

  const addEducation = async () => {
    const { degree, institution, year, score } = newEducation;
    if (!degree || !institution || !year || !score)
      return toast.error("Fill all education fields");
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/education/add", {
        education: newEducation
      }, { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
      });
      setNewEducation({ degree: "", institution: "", year: "", score: "" });
      fetchAbout();
      toast.success("Education added");
    } catch {
      toast.error("Failed to add education");
    }
  };

  const deleteEducation = async (index) => {
    try {
      await axios.patch("https://personal-portfolio-73h0.onrender.com/api/about/education/delete", {
        index
      }, { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
      });
      fetchAbout();
      toast.success("Education deleted");
    } catch {
      toast.error("Failed to delete education");
    }
  };

  if (!about) return <div className="manage-about-loading">Loading...</div>;

  return (
    <div className="manage-about-container">
      <h1 className="manage-about-heading" data-aos="fade-down">
        Manage About Section
      </h1>

      {/* BIO */}
      <div className="manage-about-section" data-aos="fade-up">
        <h2 className="manage-about-title">Bio</h2>
        <textarea
          className="manage-about-textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button className="manage-about-add-btn" onClick={updateBio}>
          Update Bio
        </button>
      </div>

      {/* EDUCATION */}
      <div className="manage-about-section" data-aos="fade-up">
        <h2 className="manage-about-title">Education</h2>
        <div className="manage-about-list">
          {about.education.map((edu, idx) => (
            <div key={idx} className="manage-about-item-card">
              <p className="manage-about-item-text">
                {edu.degree} at {edu.institution} ({edu.year}) - {edu.score}
              </p>
              <button
                className="manage-about-delete-btn"
                onClick={() => deleteEducation(idx)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="manage-about-input-group">
          <input
            type="text"
            placeholder="Degree"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institution: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Year"
            value={newEducation.year}
            onChange={(e) =>
              setNewEducation({ ...newEducation, year: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Score"
            value={newEducation.score}
            onChange={(e) =>
              setNewEducation({ ...newEducation, score: e.target.value })
            }
          />
          <button className="manage-about-add-btn" onClick={addEducation}>
            Add Education
          </button>
        </div>
      </div>

      {/* HOBBIES */}
      <div className="manage-about-section" data-aos="begin-slide-up">
        <h2 className="manage-about-title">Hobbies</h2>
        <div className="manage-about-tags">
            {Array.isArray(about.hobbies) && about.hobbies.map((hobby, idx) => (
                <span key={idx} className="manage-about-tag">
                    {hobby} <button onClick={() => removeHobby(hobby)}>x</button>
                </span>
            ))}
        </div>
        <div className="manage-about-input-inline">
          <input
            type="text"
            placeholder="New Hobby"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
          />
          <button className="manage-about-add-btn" onClick={addHobby}>
            Add Hobby
          </button>
        </div>
      </div>

      {/* GOALS */}
      <div className="manage-about-section" data-aos="begin-slide-up">
        <h2 className="manage-about-title">Goals</h2>
        <div className="manage-about-tags">
            {Array.isArray(about.goals) && about.goals.map((goal, idx) => (
                <span key={idx} className="manage-about-tag">
                    {goal} <button onClick={() => removeGoal(goal)}>x</button>
                </span>
            ))}
        </div>
        <div className="manage-about-input-inline">
          <input
            type="text"
            placeholder="New Goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <button className="manage-about-add-btn" onClick={addGoal}>
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAbout;
