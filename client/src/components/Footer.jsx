import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-container">
        {/* Left - Brand */}
        <div className="footer-brand">
          <h3>My Portfolio</h3>
          <p>Crafted with 💙 by Hridyansh</p>
        </div>

        {/* Center - Navigation */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
             <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Right - Social */}
        <div className="footer-social">
          <h4>Connect</h4>
          <p><FaEnvelope /> hridyanshkatal@gmail.com</p>
          <div className="social-icons">
            <a href="https://github.com/Hridyansh30" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/hridyansh-katal-282712252/?originalSubdomain=in" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://x.com/HridyanshK30" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/hridyanshkatal/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hridyansh | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
