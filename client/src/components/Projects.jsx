import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  SiMongodb, SiExpress, SiReact, SiNodedotjs, SiFramer, SiPython, SiPlotly, SiFlask, SiOpenai, SiTailwindcss, SiFastapi,
  SiHtml5, SiCss3, SiTypescript, SiJavascript, SiBootstrap, SiGit, SiGithub, SiLinux, SiOllama, SiPostgresql
} from "react-icons/si";

const techIcons = {
  MongoDB: <SiMongodb />, "Express.js": <SiExpress />, React: <SiReact />, "Node.js": <SiNodedotjs />,
  "Framer Motion": <SiFramer />, Python: <SiPython />, Plotly: <SiPlotly />, Flask: <SiFlask />,
  OpenAI: <SiOpenai />, TailwindCSS: <SiTailwindcss />, FastAPI: <SiFastapi />,
  HTML: <SiHtml5 />,"HTML5": <SiHtml5 />, CSS: <SiCss3 />, TypeScript: <SiTypescript />, JavaScript: <SiJavascript />,
  Bootstrap: <SiBootstrap />, Git: <SiGit />, GitHub: <SiGithub />, Linux: <SiLinux />, Ollama: <SiOllama />, PostgreSQL: <SiPostgresql />
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5050/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, );

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title" data-aos="fade-up">My Projects</h2>
      <div className="slider-container">
        <button className="nav-arrow left" onClick={prevSlide}><FiChevronLeft /></button>
        <div className="project-slider" data-aos="fade-up">
          {projects.map((project, index) => {
            let position = index - currentIndex;
            if (position === -1 || (currentIndex === 0 && index === projects.length - 1)) position = -1;
            if (position === 1 || (currentIndex === projects.length - 1 && index === 0)) position = 1;

            let className = "project-card3d";
            if (position === 0) className += " active";
            else if (position === -1) className += " prev";
            else if (position === 1) className += " next";

            return (
              <div
                className={className}
                key={index}
                onClick={() => setModalData(project)}
              >
                <div className="project-card-bg" style={{ backgroundImage: `url(${project.image})` }}>
                  <div className="glass-content">
                    <h3>{project.name}</h3>
                    <div className="tech-stack">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-badge">{techIcons[tech] || tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
                      {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="nav-arrow right" onClick={nextSlide}><FiChevronRight /></button>
      </div>

      <div className="pagination-dots">
        {projects.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {modalData && (
        <div className="modal-overlay" onClick={() => setModalData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalData.name}</h3>
            <p>{modalData.description}</p>
            <div className="tech-stack">
              {modalData.tech.map((tech, i) => (
                <span key={i} className="tech-badge">{techIcons[tech] || tech}</span>
              ))}
            </div>
            <div className="tags">
              {modalData.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            {modalData.features?.length > 0 && (
              <ul className="features">
                {modalData.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}
            {modalData.image && (
              <div className="iframe-container">
                <img src={modalData.image} height="300rem" width="600rem" title="Preview" allowFullScreen></img>
              </div>
            )}
            <div className="project-links">
              {modalData.github && <a href={modalData.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
              {modalData.live && <a href={modalData.live} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>}
            </div>
            <button className="close-modal" onClick={() => setModalData(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
