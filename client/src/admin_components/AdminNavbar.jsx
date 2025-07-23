import React, { useEffect, useState } from "react";
import "./AdminNavbar.css";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-title" onClick={() => navigate("/admin/dashboard")}>
        Admin Dashboard
      </div>

      <div className="admin-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <>
              <MoonIcon className="theme-icon" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <SunIcon className="theme-icon" />
              <span>Light</span>
            </>
          )}
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
