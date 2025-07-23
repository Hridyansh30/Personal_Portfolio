import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import { toast } from "react-toastify";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("https://personal-portfolio-73h0.onrender.com/api/contact", {
        name, email, subject, message
      });

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title" data-aos="fade-down">Get in Touch</h2>
      <div className="contact-container">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-up">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info" data-aos="fade-left">
          <h3>Contact Info</h3>
          <p><FaMapMarkerAlt />Chandigarh, India</p>
          <p><FaEnvelope /> hridyanshkatal@gmail.com</p>
          <p><FaPhone /> +91 76580 85814</p>
          <div className="social-icons" data-aos="fade-up">
            <a href="https://github.com/Hridyansh30" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/hridyansh-katal-282712252/?originalSubdomain=in" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://x.com/HridyanshK30" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/hridyanshkatal/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
