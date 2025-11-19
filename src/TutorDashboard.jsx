import React, { useState, useEffect } from "react";
import {
  fetchTutorDashboard,
  fetchTutorCourses,
  fetchUpcomingClasses,
} from "./authService";

import TutorCourses from "./TutorCourses";
import TutorAddCourse from "./TutorAddCourse";
import TutorClasses from "./TutorClasses";
import TutorProfile from "./TutorProfile";

const TutorDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadCourses();
    loadClasses();
  }, []);

  /* -------------------- 📊 Load Dashboard Stats -------------------- */
  const loadDashboard = async () => {
    try {
      const data = await fetchTutorDashboard();
      setStats(data);
    } catch {
      console.log("Failed to load dashboard stats");
    }
  };

  /* -------------------- 📘 Load Tutor Courses -------------------- */
  const loadCourses = async () => {
    try {
      const data = await fetchTutorCourses();
      setCourses(data);
    } catch {
      console.log("Failed to load courses");
    }
  };

  /* -------------------- 🎥 Load Upcoming Classes -------------------- */
  const loadClasses = async () => {
    try {
      const data = await fetchUpcomingClasses();
      setClasses(data);
    } catch {
      console.log("Failed to load upcoming classes");
    }
  };

  /* -------------------- 🚪 Logout -------------------- */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
      
      {/* Left Sidebar */}
      <div className="bg-dark text-white p-3" style={{ minWidth: "250px" }}>
        <h3 className="text-center mb-4">Tutor Dashboard</h3>

        <button className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActive("dashboard")}>📊 Dashboard</button>

        <button className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActive("courses")}>📘 My Courses</button>

        <button className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActive("add")}>➕ Add Course</button>

        <button className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActive("classes")}>🎥 Live Classes</button>

        <button className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActive("profile")}>👤 Profile</button>

        <button className="btn btn-danger w-100 mt-3" onClick={logout}>Logout</button>
      </div>

      {/* Right Content Area */}
      <div className="flex-grow-1 p-4">

        {/* Dashboard Section */}
        {active === "dashboard" && (
          <div>
            <h3>📊 Dashboard Overview</h3>
            <div className="row mt-3">
              <div className="col-md-4">
                <div className="card p-3 shadow">
                  Total Courses: {stats.totalCourses}
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3 shadow">
                  Approved: {stats.approvedCourses}
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3 shadow">
                  Pending: {stats.pendingCourses}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Section */}
        {active === "courses" && (
          <TutorCourses courses={courses} reload={loadCourses} />
        )}

        {/* Add Course */}
        {active === "add" && (
          <TutorAddCourse onCreated={loadCourses} />
        )}

        {/* Classes Section */}
        {active === "classes" && (
          <TutorClasses sessions={classes} reload={loadClasses} />
        )}

        {/* Profile Section */}
        {active === "profile" && <TutorProfile />}
      </div>
    </div>
  );
};

export default TutorDashboard;
