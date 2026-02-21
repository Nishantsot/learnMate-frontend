import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [tutors, setTutors] = useState([]);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      if (role !== "ADMIN") {
        alert("Access denied. Only Admins allowed.");
        navigate("/login");
        return;
      }

      loadData(token);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const loadData = async (token) => {
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const [statsRes, tutorRes] = await Promise.all([
        axiosInstance.get("/admin/dashboard"),
        axiosInstance.get("/admin/tutors/pending"),
      ]);

      setStats(statsRes.data);
      setTutors(tutorRes.data);
    } catch (error) {
      setMessage("⚠️ Failed to load admin data. Please check your server or token.");
      console.error(error);
    }
  };

  // 🔹 Approve Tutor
const approveTutor = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:8080/admin/course/approve/${id}`,   // ✅ FIXED URL
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadData(token); // refresh list
  } catch (error) {
    console.error("Approve failed", error);
  }
};

const rejectTutor = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:8080/admin/tutor/reject/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadData(token);
  } catch (error) {
    console.error("Reject failed", error);
  }
};




  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const chartData = {
    labels: ["Users", "Tutors", "Students", "Approved Courses", "Revenue"],
    datasets: [
      {
        label: "LearnMate Stats",
        data: [
          stats.totalUsers || 0,
          stats.totalTutors || 0,
          stats.totalStudents || 0,
          stats.approvedCourses || 0,
          stats.revenue || 0,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#6f42c1"],
      },
    ],
  };

  return (
  <div className="container-fluid p-0">
    <div className="row g-0 min-vh-100">

      {/* 🔹 Sidebar */}
      <div className="col-12 col-md-3 col-lg-2 bg-dark text-white p-4">
        <h4 className="fw-bold text-center mb-4 text-info">LearnMate Admin</h4>

        <button
          className={`btn w-100 mb-2 ${
            activeSection === "dashboard"
              ? "btn-info text-dark"
              : "btn-outline-light"
          }`}
          onClick={() => setActiveSection("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={`btn w-100 mb-2 ${
            activeSection === "pending"
              ? "btn-info text-dark"
              : "btn-outline-light"
          }`}
          onClick={() => setActiveSection("pending")}
        >
          🧑‍🏫 Pending Tutors
        </button>

        <button
          className="btn btn-danger w-100 mt-4"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>

      {/* 🔹 Main Content */}
      <div className="col-12 col-md-9 col-lg-10 bg-light p-4">

        {message && (
          <div className="alert alert-warning shadow-sm">
            {message}
          </div>
        )}

        {/* ================= DASHBOARD ================= */}
        {activeSection === "dashboard" && (
          <>
            <h3 className="fw-bold mb-4">📈 Dashboard Overview</h3>

            {/* 🔹 Stats Cards */}
            <div className="row g-4 mb-4">
              {Object.entries(stats).map(([key, val]) => (
                <div className="col-6 col-md-4 col-lg-3" key={key}>
                  <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
                    <h6 className="text-muted text-capitalize mb-2">
                      {key.replace(/([A-Z])/g, " $1")}
                    </h6>
                    <h2 className="fw-bold text-primary">{val}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 Chart */}
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <h5 className="fw-bold text-primary mb-3">
                📊 Performance Chart
              </h5>
              <div style={{ maxHeight: "400px" }}>
                <Bar data={chartData} />
              </div>
            </div>
          </>
        )}

        {/* ================= PENDING TUTORS ================= */}
        {activeSection === "pending" && (
          <>
            <h3 className="fw-bold mb-4">🧑‍🏫 Pending Tutor Approvals</h3>

            {tutors.length === 0 ? (
              <div className="alert alert-info shadow-sm">
                No pending tutors found.
              </div>
            ) : (
              <div className="card shadow-sm border-0 rounded-4 p-3">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutors.map((t) => (
                        <tr key={t.id}>
                          <td>{t.id}</td>
                          <td>{t.name}</td>
                          <td>{t.email}</td>
                          <td>{t.subject || "—"}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-success btn-sm me-2 px-3"
                              onClick={() => approveTutor(t.id)}
                            >
                              ✔ Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm px-3"
                              onClick={() => rejectTutor(t.id)}
                            >
                              ✖ Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default AdminDashboard;
