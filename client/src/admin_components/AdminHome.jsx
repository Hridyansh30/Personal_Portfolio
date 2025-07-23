import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import axios from "axios";
import { toast } from "react-toastify";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, CartesianGrid } from "recharts";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";

const DashboardHome = () => {
  const [counts, setCounts] = useState({ contacts: 0, projects: 0, experiences: 0 });
  const [contactDist, setContactDist] = useState([]);
  const [skillsDist, setSkillsDist] = useState([]);
  //const [projectMonthDist, setProjectMonthDist] = useState([]);
  const [projectTechDist, setProjectTechDist] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchCounts();
    //fetchContactDist();
    fetchSkillsDist();
    //fetchProjectMonthDist();
    fetchProjectTechDist();
  }, []);

  useEffect(() => {
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 5 }, (_, i) => currentYear - i);
  setYears(yearList);
  fetchContactDist(currentYear);
}, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/stats/counts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      setCounts(res.data);
    } catch {
      toast.error("Failed to fetch counts");
    }
  };

  const fetchContactDist = async (year) => {
  try {
    const res = await axios.get(`http://localhost:5050/api/stats/contact-year?year=${year}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    });
    const formattedData = res.data.map((count, index) => ({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index],
      count
    }));
    setContactDist(formattedData);
  } catch {
    toast.error("Failed to fetch contact distribution");
  }
};


  const fetchSkillsDist = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/stats/skills-cat", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      setSkillsDist(res.data);
    } catch {
      toast.error("Failed to fetch skills distribution");
    }
  };

//   const fetchProjectMonthDist = async () => {
//     try {
//       const res = await axios.get("http://localhost:5050/api/stats/projects-year", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
//       });
//       setProjectMonthDist(res.data);
//     } catch {
//       toast.error("Failed to fetch project monthly distribution");
//     }
//   };

  const fetchProjectTechDist = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/stats/projects-tech", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      setProjectTechDist(res.data);
    } catch {
      toast.error("Failed to fetch project tech distribution");
    }
  };

  const COLORS = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="dashboard-home-container">
      <h1 data-aos="fade-down">Welcome, Admin 👋</h1>

      <div className="cards-container" data-aos="fade-up">
        <div className="count-card" >
          <h2><CountUp end={counts.contacts} duration={2} /></h2>
          <p>Contacts</p>
        </div>
        <div className="count-card" >
          <h2><CountUp end={counts.skills} duration={2} /></h2>
          <p>Skills</p>
        </div>
        <div className="count-card">
          <h2><CountUp end={counts.projects} duration={2} /></h2>
          <p>Projects</p>
        </div>
        <div className="count-card">
          <h2><CountUp end={counts.experiences} duration={2} /></h2>
          <p>Experiences</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Contacts by Month (Line Chart)</h3>
          <div className="year-selector">
            <label>Select Year:</label>
            <select
                value={selectedYear}
                onChange={(e) => {
                const year = parseInt(e.target.value);
                setSelectedYear(year);
                fetchContactDist(year);
                }}
            >
                {years.map((year) => (
                <option key={year} value={year}>{year}</option>
                ))}
            </select>
            </div>
          <ResponsiveContainer width="95%" height={300}>
            <LineChart data={contactDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Skills by Category (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={skillsDist} dataKey="count" nameKey="_id" outerRadius={100} label>
                {skillsDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="chart-card">
          <h3>Projects by Month (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectMonthDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        <div className="chart-card">
          <h3>Projects by Tech (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={projectTechDist} dataKey="count" nameKey="_id" outerRadius={100} label>
                {projectTechDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
