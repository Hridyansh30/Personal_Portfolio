import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import AdminHome from "./AdminHome";
import ManageAbout from "./ManageAbout";
import ManageSkills from "./ManageSkills";
import ManageProjects from "./ManageProjects";
import ManageExperience from "./ManageExperience";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-body">
        <AdminSidebar />
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/manage-about" element={<ManageAbout />} />
            <Route path="/manage-skills" element={<ManageSkills />} />
            <Route path="/manage-projects" element={<ManageProjects />} />
            <Route path="/manage-experience" element={<ManageExperience />} /> */
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
