import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaGamepad,
  FaBook,
  FaMusic,
  FaLaptopCode,
  FaDumbbell,
  FaGlobe,
  FaPenFancy,
  FaBrain
} from "react-icons/fa";

const hobbyIcons = {
  Fitness: <FaDumbbell />,
  Gaming: <FaGamepad />,
  Writing: <FaPenFancy />,
  Music: <FaMusic />,
  Travel: <FaGlobe />,
  Learning: <FaBrain />,
  Reading: <FaBook />,
  Coding: <FaLaptopCode />
};

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    axios.get("http://localhost:5050/api/about")
      .then(res => setAbout(res.data))
      .catch(err => console.error("Error fetching About:", err));
  }, []);

  return (
    <div className="about-container">
      <h2 className="about-title" data-aos="fade-up">About Me</h2>
    <section id="about" className="about-section">
      <div className="about-left" data-aos="fade-right">
        <div className="intro-box">
          <div className="avatar-box">
            <img
              src="./assets/avatar.png"
              alt="Hridyansh Avatar"
              className="avatar-img"
            />
            <h3 className="intro-text">{about.bio}</h3>
          </div>

          <div className="timeline">
            {about.education?.map((edu, index) => (
              <div className="timeline-item" key={index}>
                <span className="timeline-icon">{edu.icon || "🎓"}</span>
                <div className="timeline-content">
                  <h4>{edu.degree}</h4>
                  <h4>{edu.year}</h4>
                  <p>{edu.institution} – {edu.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-right">
        <div className="about-hobbies" data-aos="fade-down-left">
          <h3>Hobbies & Interests</h3>
          <div className="hobby-grid">
            {about.hobbies?.map((hobby, index) => (
              <div className="hobby-item" key={index} title={hobby}>
                <span>{hobbyIcons[hobby] || "🎯"}</span>
                <p>{hobby}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-goals" data-aos="fade-up-left">
          <h3>Goals & Fun Facts</h3>
          <ul className="goal-list">
            {about.goals?.map((goal, i) => (
              <li key={i}> {goal}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
