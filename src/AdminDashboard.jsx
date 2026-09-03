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

import {
  Users,
  GraduationCap,
  UserRound,
  BookOpen,
  Clock3,
  IndianRupee,
  CalendarCheck2,
  BadgeCheck,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSlider";
import "./AdminDashboard.css";

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

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(
        atob(
          token
            .split(".")[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      const role = payload.role
        ?.replace("ROLE_", "")
        .toUpperCase();

      if (role !== "ADMIN") {
        navigate("/login");
        return;
      }

      loadData();

    } catch (error) {
      console.error(
        "Invalid token:",
        error
      );

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");

      navigate("/login");
    }
  }, [navigate]);

  
  const loadData = async () => {
    try {
      setLoading(true);

      const [
        statsResponse,
        coursesResponse,
      ] = await Promise.all([
        axiosInstance.get(
          "/admin/dashboard"
        ),

        axiosInstance.get(
          "/admin/courses/pending"
        ),
      ]);

      setStats(
        statsResponse.data || {}
      );

      setCourses(
        coursesResponse.data || []
      );

    } catch (error) {
      console.error(
        "Failed to load admin data:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");

        navigate("/login");

      } else if (
        error.response?.status === 403
      ) {

        alert(
          "You don't have ADMIN permission."
        );

        navigate("/login");

      } else {

        alert(
          "Failed to load admin data"
        );
      }

    } finally {
      setLoading(false);
    }
  };


  const approveCourse = async (id) => {
    try {
      await axiosInstance.put(
        `/admin/course/approve/${id}`
      );

      await loadData();

    } catch (error) {
      console.error(
        "Approve error:",
        error
      );

      alert(
        "Failed to approve course"
      );
    }
  };



  const rejectCourse = async (id) => {
    try {
      await axiosInstance.put(
        `/admin/course/reject/${id}`
      );

      await loadData();

    } catch (error) {
      console.error(
        "Reject error:",
        error
      );

      alert(
        "Failed to reject course"
      );
    }
  };


  const dashboardCards = [
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: <Users size={24} />,
      className: "blue-card",
    },

    {
      title: "Tutors",
      value: stats.tutors ?? 0,
      icon:
        <GraduationCap size={24} />,
      className: "green-card",
    },

    {
      title: "Students",
      value:
        stats.students ?? 0,
      icon:
        <UserRound size={24} />,
      className: "orange-card",
    },

    {
      title:
        "Approved Courses",
      value:
        stats.approvedCourses ?? 0,
      icon:
        <BookOpen size={24} />,
      className: "purple-card",
    },

    {
      title:
        "Pending Courses",
      value:
        stats.pendingCourses ?? 0,
      icon:
        <Clock3 size={24} />,
      className: "yellow-card",
    },

    {
      title: "Revenue",

      value:
        `₹${Number(
          stats.revenue || 0
        ).toLocaleString("en-IN")}`,

      icon:
        <IndianRupee size={24} />,

      className: "cyan-card",
    },

    {
      title:
        "Active Bookings",

      value:
        stats.activeBookings ?? 0,

      icon:
        <CalendarCheck2 size={24} />,

      className: "pink-card",
    },

    {
      title:
        "Completed Bookings",

      value:
        stats.completedBookings ?? 0,

      icon:
        <BadgeCheck size={24} />,

      className: "teal-card",
    },
  ];



  const chartData = {
    labels: [
      "Users",
      "Tutors",
      "Students",
      "Courses",
    ],

    datasets: [
      {
        label:
          "Platform Statistics",

        data: [
          stats.totalUsers || 0,
          stats.tutors || 0,
          stats.students || 0,
          stats.approvedCourses || 0,
        ],

        backgroundColor: [
          "rgba(63, 81, 181, .80)",
          "rgba(25, 135, 84, .80)",
          "rgba(255, 193, 7, .80)",
          "rgba(111, 66, 193, .80)",
        ],

        borderRadius: 12,

        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor:
          "rgba(20,24,50,.95)",

        padding: 12,

        cornerRadius: 10,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
        },

        grid: {
          color:
            "rgba(148,163,184,.12)",
        },
      },
    },
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <AdminSidebar
        activeSection={
          activeSection
        }
        setActiveSection={
          setActiveSection
        }
      />


      {/* CONTENT */}

      <main className="admin-content">

     

        {activeSection ===
          "dashboard" && (

          <div className="admin-dashboard-page">

            {/* HEADER */}

            <div className="admin-page-header">

              <div>

                <p className="admin-overline">
                  ADMIN PANEL
                </p>

                <h2>
                  Dashboard Overview
                </h2>

                <p>
                  Monitor LearnMate users,
                  courses, bookings and
                  platform activity.
                </p>

              </div>

              <div className="dashboard-header-icon">
                <BarChart3 size={30} />
              </div>

            </div>


            {/* LOADING */}

            {loading ? (

              <div className="admin-loading">

                <div
                  className="spinner-border"
                  role="status"
                />

                <span>
                  Loading dashboard...
                </span>

              </div>

            ) : (

              <>
                {/* CARDS */}

                <div className="admin-stats-grid">

                  {dashboardCards.map(
                    (
                      item,
                      index
                    ) => (

                      <StatCard
                        key={
                          item.title
                        }
                        {...item}
                        delay={
                          index * 70
                        }
                      />

                    )
                  )}

                </div>


                {/* CHART */}

                <div className="admin-chart-card">

                  <div className="chart-heading">

                    <div>

                      <p>
                        ANALYTICS
                      </p>

                      <h4>
                        Platform Statistics
                      </h4>

                    </div>

                    <BarChart3
                      size={28}
                    />

                  </div>

                  <div className="chart-container">

                    <Bar
                      data={
                        chartData
                      }
                      options={
                        chartOptions
                      }
                    />

                  </div>

                </div>

              </>
            )}

          </div>
        )}

        {activeSection ===
          "courses" && (

          <div className="admin-dashboard-page">

            {/* HEADER */}

            <div className="admin-page-header">

              <div>

                <p className="admin-overline">
                  COURSE MANAGEMENT
                </p>

                <h2>
                  Pending Courses
                </h2>

                <p>
                  Review tutor course
                  submissions and approve
                  or reject them.
                </p>

              </div>

              <div className="dashboard-header-icon">

                <BookOpen
                  size={29}
                />

              </div>

            </div>


            {/* TABLE */}

            <div className="admin-table-card">

              <div className="table-responsive">

                <table className="admin-course-table">

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Course</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {courses.length === 0 ? (

                      <tr>

                        <td
                          colSpan="6"
                          className="empty-table"
                        >

                          <BookOpen
                            size={35}
                          />

                          <span>
                            No pending courses
                          </span>

                        </td>

                      </tr>

                    ) : (

                      courses.map(
                        (course) => (

                          <tr
                            key={
                              course.id
                            }
                          >

                            <td>
                              #{course.id}
                            </td>

                            <td>

                              <div className="course-name">

                                <div className="course-table-icon">

                                  <BookOpen
                                    size={17}
                                  />

                                </div>

                                <span>
                                  {
                                    course.title
                                  }
                                </span>

                              </div>

                            </td>

                            <td>

                              <span className="category-badge">

                                {
                                  course.category ||
                                  "General"
                                }

                              </span>

                            </td>

                            <td>

                              ₹
                              {
                                course.price ??
                                0
                              }

                            </td>

                            <td>

                              <span className="pending-badge">
                                Pending
                              </span>

                            </td>

                            <td>

                              <div className="course-actions">

                                <button
                                  className="approve-btn"

                                  onClick={() =>
                                    approveCourse(
                                      course.id
                                    )
                                  }
                                >
                                  Approve
                                </button>

                                <button
                                  className="reject-btn"

                                  onClick={() =>
                                    rejectCourse(
                                      course.id
                                    )
                                  }
                                >
                                  Reject
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}



function StatCard({
  title,
  value,
  icon,
  className,
  delay,
}) {

  return (

    <div
      className={`admin-stat-card ${className}`}

      style={{
        animationDelay:
          `${delay}ms`,
      }}
    >

      <div className="stat-card-icon">
        {icon}
      </div>

      <div className="stat-card-content">

        <p>
          {title}
        </p>

        <h3>
          {value}
        </h3>

      </div>

    </div>
  );
}