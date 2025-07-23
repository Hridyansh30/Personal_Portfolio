import React, { useEffect, useState } from "react";
import "./Skills.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Skills = () => {
  const [skillsByCategory, setSkillsByCategory] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/skills");
        const grouped = res.data.reduce((acc, skill) => {
          const cat = skill.category || "General";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(skill);
          return acc;
        }, {});
        setSkillsByCategory(grouped);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="skills-section" id="skills">
      <h2 className="skills-title" data-aos="fade-down">My Skills</h2>
      <div className="skills-grid">
        {Object.entries(skillsByCategory).map(([category, skills], index) => (
          <div
            key={category}
            className="skills-category"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h3>{category}</h3>
            {skills.map((skill, i) => (
              <div key={skill.name} className="skill-bar" data-aos="fade-right" data-aos-delay={i * 50}>
                <div className="label">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="bar-background">
                  <div
                    className="bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
