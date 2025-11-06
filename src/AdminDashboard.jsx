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

    // ✅ Check if token exists
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // ✅ Decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      if (role !== "ADMIN") {
        alert("Access denied. Only Admins allowed.");
        navigate("/login");
        return;
      }

      // ✅ Load admin data if valid
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
        axiosInstance.get("/admin/pending-tutors"),
      ]);

      setStats(statsRes.data);
      setTutors(tutorRes.data);
    } catch (error) {
      setMessage("⚠️ Failed to load admin data. Please check your server or token.");
      console.error(error);
    }
  };

  const approveTutor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/admin/approve-tutor/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData(token);
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  const rejectTutor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/reject-tutor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    labels: ["Users", "Tutors", "Students", "Courses", "Revenue"],
    datasets: [
      {
        label: "LearnMate Stats",
        data: [
          stats.totalUsers || 0,
          stats.tutors || 0,
          stats.students || 0,
          stats.approvedCourses || 0,
          stats.revenue || 0,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#6f42c1"],
      },
    ],
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3 flex-shrink-0"
        style={{ minWidth: "240px" }}
      >
        <h4 className="fw-bold text-center mb-4">LearnMate Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`btn w-100 text-start mb-2 ${
                activeSection === "dashboard"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              📊 Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn w-100 text-start mb-2 ${
                activeSection === "pending"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
              }`}
              onClick={() => setActiveSection("pending")}
            >
              🧑‍🏫 Pending Tutors
            </button>
          </li>
          <li className="nav-item mt-auto">
            <button className="btn btn-danger w-100 mt-3" onClick={logout}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {message && <div className="alert alert-info">{message}</div>}

        {activeSection === "dashboard" && (
          <>
            <h3 className="fw-bold mb-4">📈 Dashboard Overview</h3>
            <div className="row g-3 mb-4">
              {Object.entries(stats).map(([key, val]) => (
                <div className="col-6 col-md-3" key={key}>
                  <div className="card text-center shadow-sm border-0 p-3">
                    <h6 className="text-secondary text-capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </h6>
                    <h3 className="fw-bold text-primary">{val}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-4 shadow-sm border-0">
              <h5 className="fw-bold text-primary mb-3">Performance Chart</h5>
              <Bar data={chartData} />
            </div>
          </>
        )}

        {activeSection === "pending" && (
          <>
            <h3 className="fw-bold mb-3">🧑‍🏫 Pending Tutor Approvals</h3>
            {tutors.length === 0 ? (
              <p className="text-muted">No pending tutors found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped align-middle shadow-sm">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutors.map((t) => (
                      <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.name}</td>
                        <td>{t.email}</td>
                        <td>{t.subject || "—"}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => approveTutor(t.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => rejectTutor(t.id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
