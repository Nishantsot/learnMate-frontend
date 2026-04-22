import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Common Pages
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import LiveClass from "./LiveClass";
import HomeSection from "./HomeSection";
// Dashboards
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

// Student
import StudentLayout from "./StudentLayout";
import StudentCourses from "./StudentCourses";
import StudentMyCourses from "./StudentMyCourses";
import StudentClasses from "./StudentClasses";

// Tutor
import TutorLayout from "./TutorLayout";
import TutorDashboard from "./TutorDashboard";
import TutorCourses from "./TutorCourses";
import TutorClasses from "./TutorClasses";
import TutorMaterials from "./TutorMaterials";

function LayoutWrapper() {
  const location = useLocation();

  // ✅ Improved logic
  const hideNavbarRoutes = [
    "/admin",
    "/student",
    "/tutor",
    "/login",
    "/register",
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
<Route path="/home" element={<HomeSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Student */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="my-courses" element={<StudentMyCourses />} />
          <Route path="classes" element={<StudentClasses />} />
        </Route>

        {/* Tutor */}
        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<TutorDashboard />} />
          <Route path="courses" element={<TutorCourses />} />
          <Route path="classes" element={<TutorClasses />} />
          <Route path="materials" element={<TutorMaterials />} />
          <Route path="live/:roomId" element={<LiveClass />} />
        </Route>

        {/* ✅ 404 fallback */}
        <Route path="*" element={<h2 style={{textAlign:"center"}}>Page Not Found</h2>} />
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