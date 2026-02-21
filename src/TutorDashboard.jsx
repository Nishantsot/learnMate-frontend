import React, { useEffect, useState } from "react";
import { getTutorDashboard } from "./authService";

export default function TutorDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    loadData();

  }, []);


  const loadData = async () => {

    const data = await getTutorDashboard();

    setStats(data || {});

  };


  return (

    <div>

      <h3 className="mb-4 fw-bold text-white" > Tutor Dashboard</h3>


      <div className="row g-3 ">


        {[
          { label: "Total Courses", key: "totalCourses" },
          { label: "Approved Courses", key: "approvedCourses" },
          { label: "Pending Courses", key: "pendingCourses" },
          { label: "Upcoming Sessions", key: "upcomingSessions" },
          { label: "Earnings", key: "earnings" },
          { label: "Avg Rating", key: "avgRating" }
        ].map((item) => (

          <div className="col-md-3" key={item.key}>

            <div className="card shadow-sm p-3 text-center">

              <h6 className="text-muted">
                {item.label}
              </h6>

              <h4 className="fw-bold text-primary">
                {stats[item.key] ?? 0}
              </h4>

            </div>

          </div>

        ))}


      </div>


    </div>

  );

}