import React, { useEffect, useState } from "react";
import "./ManageSkills.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEllipsisV } from "react-icons/fa";

const ManageSkills = () => {
  const [newSkill, setNewSkill] = useState({ name: "", level: "", category: "" });
  const [showMenu, setShowMenu] = useState(null);
  const [skillsByCategory, setSkillsByCategory] = useState([]);
  

  useEffect(() => {
    AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    anchorPlacement: 'top-bottom',
  });
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/skills");
      const groupedSkills = res.data.reduce((acc, skill) => {
          const cat = skill.category || "General";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(skill);
          return acc;
        }, {});
        setSkillsByCategory(groupedSkills);
    } catch (err) {
        console.log(err.response?.data); 
        toast.error(err.response?.data?.message || "Failed to load skills");
    }
  };

  const addSkill = async () => {
    const { name, level } = newSkill;
    if (!name || !level) return toast.error("Name and Level are required");
    try {
      await axios.post("http://localhost:5050/api/skills/add", newSkill, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      setNewSkill({ name: "", level: "", category: "" });
      fetchSkills();
      toast.success("Skill added");
    } catch (err){
        console.log(err.response?.data); 
        toast.error(err.response?.data?.message || "Failed to add skill");
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/skills/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
      });
      fetchSkills();
      toast.success("Skill deleted");
    } catch (err) {
        console.log(err.response?.data); 
        toast.error(err.response?.data?.message || "Failed to delete skill");
    }
  };

  const updateLevel = async (id, newLevel) => {
    if (!newLevel || isNaN(newLevel) || newLevel < 0 || newLevel > 100)
      return toast.error("Invalid level (0-100)");
    try {
      await axios.patch(
        `http://localhost:5050/api/skills/level/update/${id}`,
        { level: newLevel },
        { headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        } }
      );
      fetchSkills();
      toast.success("Skill level updated");
    } catch (err) {
        console.log(err.response?.data); 
        toast.error(err.response?.data?.message || "Failed to update level");
    }
  };

  return (
    <div className="manage-skills-container">
      <h1 data-aos="fade-down">Manage Skills</h1>

      <div className="add-skill-form" data-aos="fade-up">
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Skill Level (0-100)"
          value={newSkill.level}
          onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={newSkill.category}
          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
        />
        <button onClick={addSkill}>Add Skill</button>
      </div>

      {Object.entries(skillsByCategory).map(([categoryName, skills], idx) => (
        <div className="category-section" data-aos="begin-slide-up" key={idx}>
            <h2>{categoryName}</h2>
            <div className="skills-list">
                {skills.map((skill) => (
                    <div className="skill-card" data-aos="begin-slide-up" key={skill._id}>
                    <div className="skill-name">
                        <h3>{skill.name}</h3>
                        <div className="progress-bar">
                        <div className="progress" style={{ width: `${skill.level}%` }}></div>
                        </div>
                        <p>{skill.level}%</p>
                    </div>
                    <div className="skill-actions">
                        <button className="menu-button" onClick={() => setShowMenu(showMenu === skill._id ? null : skill._id)}>
                        <FaEllipsisV />
                        </button>
                        {showMenu === skill._id && (
                        <div className="dropdown">
                            <input
                            type="number"
                            placeholder="Update Level"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") updateLevel(skill._id, e.target.value);
                            }}
                            />
                            <button onClick={() => deleteSkill(skill._id)}>Delete</button>
                        </div>
                        )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ))}

    </div>
  );
};

export default ManageSkills;
