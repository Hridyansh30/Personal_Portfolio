import React from "react";
import "./AdminSidebar.css";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserEdit, FaLaptopCode, FaProjectDiagram, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Manage About", path: "/admin/dashboard/manage-about", icon: <FaUserEdit /> },
    { name: "Manage Skills", path: "/admin/dashboard/manage-skills", icon: <FaLaptopCode /> },
    { name: "Manage Projects", path: "/admin/dashboard/manage-projects", icon: <FaProjectDiagram /> },
    { name: "Manage Experience", path: "/admin/dashboard/manage-experience", icon: <FaEnvelope /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <img src="../assets/Logo.png" alt="Admin Logo" width="100%" height="100%"/>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
