import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showBio, setShowBio] = useState(false);

  const tagline = "Empowering digital solutions through code and data.";

  useEffect(() => {
    if (index < tagline.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + tagline[index]);
        setIndex(index + 1);
      }, 30); // typing speed
      return () => clearTimeout(timeout);
    } else {
      // When typing is done, show bio
      setTimeout(() => setShowBio(true), 500);
    }
  }, [index]);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-name">Hey, I’m Hridyansh</h1>
          <h2 className="hero-tagline">{text}</h2>

          {showBio && (
            <p className="hero-bio">
              👋 Hi, I’m Hridyansh Katal, a Computer Science student at UIET, Panjab University.
              <br />
              I specialize in full-stack web development and data analysis.
              <br />
              From building responsive MERN apps to uncovering insights through Python & SQL,
              <br />
              I turn ideas and data into impactful digital solutions.
            </p>
          )}

          {showBio && (
            <a href="/Hridyansh_Resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          )}
        </div>

        {showBio && (
        <div className="hero-graphic">
          <img
            src="/assets/Hero_Profile.jpeg"
            alt="Animated Graphic"
            className="graphic"
          />
        </div>
        )}
      </div>
    </section>
  );
};

export default Home;
