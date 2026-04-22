import React, { useEffect, useState } from "react";
import { getTutorDashboard } from "./authService";

export default function TutorDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getTutorDashboard();
      setStats(data || {});
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  const cards = [
    { label: "Total Courses", key: "totalCourses" },
    { label: "Approved Courses", key: "approvedCourses" },
    { label: "Pending Courses", key: "pendingCourses" },
    { label: "Upcoming Sessions", key: "upcomingSessions" },
    { label: "Earnings", key: "earnings" },
    { label: "Avg Rating", key: "avgRating" }
  ];

  return (
    <div className="container-fluid">

      <h3 className="mb-4 fw-bold text-white">
        Tutor Dashboard
      </h3>

      <div className="row g-3">

        {cards.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={item.key}
          >

            <div className="card shadow-sm border-0 h-100 text-center p-3">

              <h6 className="text-muted mb-2">
                {item.label}
              </h6>

              <h3 className="fw-bold text-primary">
                {stats[item.key] ?? 0}
              </h3>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}