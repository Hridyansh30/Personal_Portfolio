import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const links = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Scroll event to toggle background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLinkClick = (link) => {
    setActive(link);
    setMenuOpen(false);
    const target = document.getElementById(link.toLowerCase());
    if (target)  target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="logo">My Portfolio</div>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link}>
              <a
                className={`nav-link ${active === link ? "active" : ""}`}
                onClick={() => handleLinkClick(link)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <Link to="/admin/login" className="admin-button">
          Admin
        </Link>

        {/* Theme toggle with label */}
        <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? (
            <>
            <MoonIcon className="icon" />
            <span className="theme-label">Dark</span>
            </>
        ) : (
            <>
            <SunIcon className="icon" />
            <span className="theme-label">Light</span>
            </>
        )}
        </button>


        {/* Hamburger */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          {links.map((link) => (
            <li key={link}>
              <a
                className={`nav-link ${active === link ? "active" : ""}`}
                onClick={() => handleLinkClick(link)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
