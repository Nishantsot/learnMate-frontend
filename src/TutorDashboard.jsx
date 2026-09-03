import React, {
  useEffect,
  useState,
} from "react";

import {
  BookOpen,
  BadgeCheck,
  Clock3,
  CalendarDays,
  IndianRupee,
  Star,
  GraduationCap,
} from "lucide-react";

import {
  getTutorDashboard,
} from "./authService";

import "./TutorDashboard.css";

export default function TutorDashboard() {

  const [stats, setStats] =
    useState({});

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {

    try {

      setLoading(true);

      const data =
        await getTutorDashboard();

      setStats(
        data || {}
      );

    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  const cards = [

    {
      label: "Total Courses",
      key: "totalCourses",
      icon:
        <BookOpen size={24} />,
      className:
        "tutor-blue-card",
    },

    {
      label: "Approved Courses",
      key: "approvedCourses",
      icon:
        <BadgeCheck size={24} />,
      className:
        "tutor-green-card",
    },

    {
      label: "Pending Courses",
      key: "pendingCourses",
      icon:
        <Clock3 size={24} />,
      className:
        "tutor-orange-card",
    },

    {
      label: "Upcoming Sessions",
      key: "upcomingSessions",
      icon:
        <CalendarDays size={24} />,
      className:
        "tutor-purple-card",
    },

    {
      label: "Earnings",
      key: "earnings",
      icon:
        <IndianRupee size={24} />,
      className:
        "tutor-cyan-card",
      money: true,
    },

    {
      label: "Avg Rating",
      key: "avgRating",
      icon:
        <Star size={24} />,
      className:
        "tutor-yellow-card",
      rating: true,
    },

  ];


  const formatValue = (
    item
  ) => {

    const value =
      stats[item.key] ?? 0;

    if (item.money) {

      return `₹${Number(
        value
      ).toLocaleString(
        "en-IN"
      )}`;

    }

    if (item.rating) {

      return Number(
        value
      ).toFixed(1);

    }

    return value;
  };


  return (

    <div className="tutor-dashboard-page">

      {/* HEADER */}

      <div className="tutor-dashboard-header">

        <div>

          <p className="tutor-overline">
            TUTOR PANEL
          </p>

          <h2>
            Tutor Dashboard
          </h2>

          <p>
            Manage your courses,
            sessions, earnings and
            teaching performance.
          </p>

        </div>


        <div className="tutor-header-icon">

          <GraduationCap
            size={31}
          />

        </div>

      </div>


      {/* LOADING */}

      {loading ? (

        <div className="tutor-dashboard-loading">

          <div
            className="spinner-border"
            role="status"
          />

          <span>
            Loading dashboard...
          </span>

        </div>

      ) : (

        <div className="tutor-stats-grid">

          {cards.map(
            (
              item,
              index
            ) => (

              <TutorStatCard
                key={
                  item.key
                }
                label={
                  item.label
                }
                value={
                  formatValue(
                    item
                  )
                }
                icon={
                  item.icon
                }
                className={
                  item.className
                }
                delay={
                  index * 80
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
}


function TutorStatCard({
  label,
  value,
  icon,
  className,
  delay,
}) {

  return (

    <div
      className={`tutor-stat-card ${className}`}

      style={{
        animationDelay:
          `${delay}ms`,
      }}
    >

      <div className="tutor-stat-icon">
        {icon}
      </div>


      <div className="tutor-stat-content">

        <p>
          {label}
        </p>

        <h3>
          {value}
        </h3>

      </div>

    </div>

  );
}