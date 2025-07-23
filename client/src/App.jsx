import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./admin_components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./admin_components/AdminDashboard";
import AdminHome from "./admin_components/AdminHome";
import ManageAbout from "./admin_components/ManageAbout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin/login" element={
            <AdminLogin />
        } />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        </Route>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </>
        } />
      </Routes>
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
  );
}

export default App;

