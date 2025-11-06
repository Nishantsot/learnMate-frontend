import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import HomeSection from "./HomeSection";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";

// ✅ Hide Navbar on certain routes (like admin/tutor/student)
function LayoutWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/admin", "/student-dashboard", "/tutor-dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
