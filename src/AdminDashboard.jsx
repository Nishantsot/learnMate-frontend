import React, { useEffect, useState } from "react";
import axiosInstance from "./axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSlider";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [courses, setCourses] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");

  // AUTH CHECK

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "ADMIN") {
        navigate("/login");
        return;
      }

      loadData();
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // LOAD DATA

  const loadData = async () => {
    try {
      const statsRes = await axiosInstance.get("/admin/dashboard");
      const courseRes = await axiosInstance.get("/admin/courses/pending");

      setStats(statsRes.data);
      setCourses(courseRes.data);
    } catch (error) {
      console.error("Failed to load admin data:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (error.response?.status === 403) {
        alert("You don't have ADMIN permission.");
        navigate("/login");
      } else {
        alert("Failed to load admin data");
      }
    }
  };

  // APPROVE COURSE

  const approveCourse = async (id) => {
    try {
      await axiosInstance.put(`/admin/course/approve/${id}`);

      alert("Course approved successfully");

      loadData();
    } catch (error) {
      console.error("Approve error:", error);
      alert("Failed to approve course");
    }
  };

  // REJECT COURSE

  const rejectCourse = async (id) => {
    try {
      await axiosInstance.put(`/admin/course/reject/${id}`);

      alert("Course rejected successfully");

      loadData();
    } catch (error) {
      console.error("Reject error:", error);
      alert("Failed to reject course");
    }
  };

  // CHART

  const chartData = {
    labels: ["Users", "Tutors", "Students", "Courses"],

    datasets: [
      {
        label: "Stats",
        data: [
          stats.totalUsers || 0,
          stats.tutors || 0,
          stats.students || 0,
          stats.approvedCourses || 0,
        ],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#6f42c1",
        ],
      },
    ],
  };

  // UI

  return (
    <div className="admin-layout">

      <AdminSidebar
        setActiveSection={setActiveSection}
      />

      <div className="admin-content">

        {/* DASHBOARD */}

        {activeSection === "dashboard" && (
          <>
            <h2 className="mb-4">
              Dashboard
            </h2>

            <div className="row g-3">

              <Card
                title="Users"
                value={stats.totalUsers}
              />

              <Card
                title="Tutors"
                value={stats.tutors}
              />

              <Card
                title="Students"
                value={stats.students}
              />

              <Card
                title="Courses"
                value={stats.approvedCourses}
              />

            </div>

            {/* EXTRA STATS */}

            <div className="row g-3 mt-1">

              <Card
                title="Pending Courses"
                value={stats.pendingCourses}
              />

              <Card
                title="Revenue"
                value={`₹${stats.revenue || 0}`}
              />

              <Card
                title="Active Bookings"
                value={stats.activeBookings}
              />

              <Card
                title="Completed Bookings"
                value={stats.completedBookings}
              />

            </div>

            {/* CHART */}

            <div className="card shadow mt-4 p-3">

              <h5 className="mb-3">
                Platform Statistics
              </h5>

              <Bar data={chartData} />

            </div>
          </>
        )}

        {/* COURSES */}

        {activeSection === "courses" && (
          <>
            <h2 className="mb-3">
              Pending Courses
            </h2>

            <div className="table-responsive">

              <table className="table table-dark">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {courses.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center"
                      >
                        No pending courses
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id}>

                        <td>{course.id}</td>

                        <td>{course.title}</td>

                        <td>{course.category}</td>

                        <td>₹{course.price}</td>

                        <td>

                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              approveCourse(course.id)
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              rejectCourse(course.id)
                            }
                          >
                            Reject
                          </button>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>
          </>
        )}

      </div>
    </div>
  );
}


// CARD

function Card({ title, value }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">

      <div className="card shadow-sm text-center h-100">

        <div className="card-body">

          <h6 className="text-muted">
            {title}
          </h6>

          <h3 className="fw-bold">
            {value ?? 0}
          </h3>

        </div>

      </div>

    </div>
  );
}