import React, { useEffect, useState } from "react";
import "./ManageProjects.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "", description: "", tech: "", tags: "", github: "", live: "", image: "", features: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://personal-portfolio-73h0.onrender.com/api/projects");
      setProjects(res.data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const addProject = async () => {
    const payload = {
      ...newProject,
      tech: newProject.tech.split(",").map(t => t.trim()),
      tags: newProject.tags.split(",").map(t => t.trim()),
      features: newProject.features.split(",").map(f => f.trim())
    };
    try {
      await axios.post("https://personal-portfolio-73h0.onrender.com/api/projects/add", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      toast.success("Project added!");
      fetchProjects();
      setNewProject({ name: "", description: "", tech: "", tags: "", github: "", live: "", image: "", features: "" });
    } catch {
      toast.error("Error adding project");
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://personal-portfolio-73h0.onrender.com/api/projects/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      toast.success("Project deleted!");
      fetchProjects();
    } catch {
      toast.error("Error deleting project");
    }
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const updateProject = async () => {
    const payload = {
      ...currentProject,
      tech: currentProject.tech.split(",").map(t => t.trim()),
      tags: currentProject.tags.split(",").map(t => t.trim()),
      features: currentProject.features.split(",").map(f => f.trim())
    };
    try {
      await axios.patch(`https://personal-portfolio-73h0.onrender.com/api/projects/update/${currentProject._id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      toast.success("Project updated!");
      fetchProjects();
      setShowModal(false);
    } catch {
      toast.error("Error updating project");
    }
  };

  return (
    <div className="manage-projects-container">
      <h1 data-aos="fade-down">Manage Projects</h1>

      <div className="add-project-form" data-aos="begin-fade-up">
        {["name", "description", "tech", "tags", "github", "live", "image", "features"].map((field) => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newProject[field]}
            onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
          />
        ))}
        <button onClick={addProject}>Add Project</button>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <div className="project-card" data-aos="begin-fade-up" key={project._id}>
            <h2>{project.name}</h2>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Tech:</strong> {project.tech.join(", ")}</p>
            <p><strong>Tags:</strong> {project.tags.join(", ")}</p>
            {project.github && <p><a href={project.github} target="_blank">GitHub</a></p>}
            {project.live && <p><a href={project.live} target="_blank">Live</a></p>}
            {project.image && <img src={project.image} alt="Project Visual" className="project-img" />}
            {project.features.length > 0 && (
    <ul className="features-list">
      {project.features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  )}
            <div className="project-buttons">
              <button className="edit-btn" onClick={() => openEditModal(project)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteProject(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit Project</h2>
            {["name", "description", "tech", "tags", "github", "live", "image", "features"].map((field) => (
              <input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={currentProject[field]}
                onChange={(e) => setCurrentProject({ ...currentProject, [field]: e.target.value })}
              />
            ))}
            <div className="modal-buttons">
              <button onClick={updateProject}>Update</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
