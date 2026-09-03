import {
  useEffect,
  useState,
} from "react";

import {
  BookOpen,
  GraduationCap,
  Video,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import {
  fetchStudentDashboard,
} from "./authService";

import "./StudentDashboard.css";


export default function StudentDashboard() {

  const [data, setData] = useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    load();
  }, []);


  const load = async () => {

    try {

      setLoading(true);
      setError("");

      const res =
        await fetchStudentDashboard();

      console.log(
        "Student Dashboard:",
        res
      );

      setData(res || {});

    } catch (err) {

      console.error(
        "Student dashboard error:",
        err
      );

      setError(
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);
    }
  };


  const cards = [

    {
      title: "My Courses",

      value:
        data.totalCourses ?? 0,

      icon:
        <GraduationCap size={25} />,

      className:
        "student-stat-blue",
    },

    {
      title: "Upcoming Classes",

      value:
        data.upcomingClasses ?? 0,

      icon:
        <Video size={25} />,

      className:
        "student-stat-purple",
    },

    {
      title: "Learning Status",

      value:
        data.totalCourses > 0
          ? "Active"
          : "Start Learning",

      icon:
        <BookOpen size={25} />,

      className:
        "student-stat-green",
    },

  ];


  return (

    <div className="student-dashboard-page">


    
      <div className="student-dashboard-header">

        <div>

          <div className="student-dashboard-label">

            <Sparkles size={15} />

            STUDENT DASHBOARD

          </div>


          <h1>
            Welcome Back 👋
          </h1>


          <p>
            Track your courses,
            upcoming classes and
            continue your learning
            journey.
          </p>

        </div>


        <button
          className="student-refresh-btn"
          onClick={load}
          disabled={loading}
        >

          <RefreshCw
            size={17}
            className={
              loading
                ? "student-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


 

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>

      )}




      <div className="student-stats-grid">

        {cards.map(
          (card, index) => (

            <div
              className={`student-stat-card ${card.className}`}
              key={card.title}

              style={{
                animationDelay:
                  `${index * 100}ms`,
              }}
            >

              <div className="student-stat-top">

                <div className="student-stat-icon">

                  {card.icon}

                </div>

              </div>


              <div className="student-stat-content">

                <span>
                  {card.title}
                </span>


                <h2>

                  {loading
                    ? "..."
                    : card.value}

                </h2>

              </div>

            </div>

          )
        )}

      </div>


     

      <div className="student-overview-card">

        <div className="student-overview-icon">

          <BookOpen size={25} />

        </div>


        <div>

          <h4>
            Your Learning Overview
          </h4>

          <p>
            You are enrolled in{" "}

            <strong>
              {data.totalCourses ?? 0}
            </strong>

            {" "}course(s) and have{" "}

            <strong>
              {data.upcomingClasses ?? 0}
            </strong>

            {" "}upcoming live
            class(es).
          </p>

        </div>

      </div>

    </div>
  );
}

