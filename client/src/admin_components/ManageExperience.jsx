import React, { useEffect, useState } from "react";
import "./ManageExperience.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast } from "react-toastify";

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    mentor: "",
    duration: "",
    description: "",
    tech: "",
  });
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get("https://personal-portfolio-73h0.onrender.com/api/experience");
      setExperiences(res.data);
    } catch (err){
        console.log(err);
        console.log(err.response?.data); 
        toast.error(err.response?.data?.message || "Failed to load Experiences");
    }
  };

  const handleAdd = async () => {
    const { title, company, duration, description } = newExperience;
    if (!title || !company || !duration || !description) return toast.error("Please fill required fields");

    try {
      await axios.post("https://personal-portfolio-73h0.onrender.com/api/experience/add", {
        ...newExperience,
        tech: newExperience.tech.split(",").map((t) => t.trim()).filter(t => t.length > 0),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      setNewExperience({ title: "", company: "", mentor: "", duration: "", description: "", tech: "" });
      fetchExperiences();
      toast.success("Experience Added");
    } catch {
      toast.error("Failed to add experience");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://personal-portfolio-73h0.onrender.com/api/experience/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      fetchExperiences();
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = async () => {
    const { title, company, mentor, duration, description, tech } = editingExperience;
    if (!title || !company || !duration || !description) return toast.error("Required fields missing");

    try {
      await axios.patch(`https://personal-portfolio-73h0.onrender.com/api/experience/update/${editingExperience._id}`, {
        title, company, mentor, duration, description,
        tech: tech.split(",").map((t) => t.trim()).filter(t => t.length > 0)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      setEditingExperience(null);
      fetchExperiences();
      toast.success("Updated Successfully");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="manage-experience-container">
      <h1 data-aos="begin-fade-down">Manage Experience</h1>

      <div className="add-form" data-aos="begin-fade-up">
        {["title", "company", "mentor", "duration", "description", "tech"].map((field) => (
          <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
            value={newExperience[field]} 
            onChange={(e) => setNewExperience({ ...newExperience, [field]: e.target.value })} />
        ))}
        <button onClick={handleAdd}>Add Experience</button>
      </div>

      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp._id} className="experience-card" data-aos="begin-fade-up">
            <div>
              <h2>{exp.title}</h2>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Mentor:</strong> {exp.mentor}</p>
              <p><strong>Duration:</strong> {exp.duration}</p>
              <p><strong>Description:</strong> {exp.description}</p>
              <p><strong>Tech:</strong> {exp.tech.join(", ")}</p>
            </div>
            <div className="actions">
              <button className="edit-button" onClick={() => setEditingExperience({ ...exp, tech: exp.tech.join(", ") })}>
                Edit</button>
              <button className="delete-button" onClick={() => handleDelete(exp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingExperience && (
        <div className="edit-modal">
          <div className="modal-content" data-aos="begin-zoom-in">
            <h2>Edit Experience</h2>
            {["title", "company", "mentor", "duration", "description", "tech"].map((field) => (
              <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                value={editingExperience[field]} 
                onChange={(e) => setEditingExperience({ ...editingExperience, [field]: e.target.value })} />
            ))}
            <div className="modal-buttons">
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setEditingExperience(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExperience;
