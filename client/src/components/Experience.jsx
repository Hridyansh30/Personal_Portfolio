import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Experience.css";
import {
  FaPython, FaReact, FaDatabase
} from "react-icons/fa";
import {
  SiFlask, SiMongodb, SiNumpy, SiNodedotjs, SiFastapi, SiPython, SiPostgresql, SiDocker, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiGit, SiGithub, SiLinux
} from "react-icons/si";

// Map of tech string to icon
const techIcons = {
  Python: <FaPython />,
  React: <FaReact />,
  MongoDB: <SiMongodb />,
  Node: <SiNodedotjs />,
  "Node.js": <SiNodedotjs />,
  Flask: <SiFlask />,
  NumPy: <SiNumpy />,
  Database: <FaDatabase />,
  FastAPI: <SiFastapi />,
  PostgreSQL: <SiPostgresql />,
  Docker: <SiDocker />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  HTML5: <SiHtml5 />,
  CSS: <SiCss3 />,
  Tailwind: <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  Linux: <SiLinux />,
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get("https://personal-portfolio-73h0.onrender.com/api/experience")
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Failed to load experiences:", err));
  }, []);

  return (
    <section className="experience-section" id="experience">
      <h2 className="section-title" data-aos="fade-up">Experience & Trainings</h2>
      <div className="timeline-container">
        {experiences.map((exp, index) => (
          <div className="timeline-item" key={index} data-aos="fade-up" data-aos-delay={index * 200}>
            <div className="timeline-icon">{techIcons[exp.tech[0]] || "💼"}</div>
            <div className="timeline-content">
              <h3>{exp.title}</h3>
              <span className="company">{exp.company}</span>
              <span className="mentor">Mentor: {exp.mentor}</span>
              <span className="duration">{exp.duration}</span>
              <p>{exp.description}</p>
              <div className="tech-icons">
                {exp.tech.map((tech, i) => (
                  <span key={i}>{techIcons[tech] || tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
