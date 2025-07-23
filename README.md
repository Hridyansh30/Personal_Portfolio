# 🚀 MERN Stack Portfolio Website with Admin Dashboard & AI Integration

A fully responsive and modern portfolio website built using the **MERN stack** (MongoDB, Express, React, NodeJS). Includes an **Admin Dashboard** for managing portfolio data and integrates **AI features** like **Intent Detection** using **Ollama**.

## ✨ Features

### ✅ Frontend:
- Responsive React Single Page Application (SPA)
- Smooth animations using AOS
- Dark/Light mode toggle
- Sections: Home, About, Skills, Projects, Experience, Contact
- **Project Slider** with interactive 3D animations
- Resume download option
- Contact form with **AI Intent Detection**
- Clean, minimalist design with glassmorphism elements
- Mobile-first responsiveness across all devices

### ✅ Backend:
- ExpressJS API server
- MongoDB database with Mongoose
- RESTful APIs for managing:
    - Projects
    - Skills
    - Experiences
    - Contact messages
- Nodemailer integration to send contact emails
- **Ollama AI Integration**:
    - Intent detection on contact messages
- Admin Authentication using JWT with secure login panel
- Admin dashboard to **add/edit/delete** portfolio content

## 🖼️ Admin Dashboard Highlights:
- Login page with animations and modern UI
- CRUD operations on Projects, Skills, Experience
- Real-time contact form submissions with intent labels
- Project recommendations (optional)

---

## 💻 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React, Axios, AOS, CSS |
| Backend | NodeJS, ExpressJS, Mongoose |
| Database | MongoDB Atlas |
| AI | Ollama (phi3/mistral/llama2) |
| Email | Nodemailer (Gmail SMTP) |
| Hosting | Vercel (Frontend), Render (Backend) |
| Authentication | JWT |

---

## 📁 Project Structure

---

## 🚀 Live Links

| Environment | Link |
|--------------|------|
| 🟣 Frontend | [https://personal-portfolio-vpfs.vercel.app](https://personal-portfolio-vpfs.vercel.app) |
| 🟡 Backend API | [https://personal-portfolio-73h0.onrender.com](https://personal-portfolio-73h0.onrender.com) |
| 🧑‍💻 Admin Dashboard | `/admin` route on frontend (protected) |

---

## 🌟 Setup Guide (Local Development)

1. Clone repository
   git clone https://github.com/Hridyansh30/Personal_Portfolio.git
   cd mern-portfolio

2. Setup Backend
   cd server
   npm install
   npm run dev

3. Setup Frontend
   cd client
   npm install
   npm start

4. Configure .env files in both /server and /client (check .env.example).

---

## 📝 Future Improvements
    - Expand AI features with more personalized recommendations

    - Add blog section with rich content editor

    - Role-based admin system

    - Real-time notifications in admin dashboard

## 📧 Contact
Created and maintained by Hridyansh Katal | 
📩 hridyanshkatal@gmail.com

