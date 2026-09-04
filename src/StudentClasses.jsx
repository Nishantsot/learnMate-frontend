import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchMyClasses,
} from "./authService";

import {
  Video,
  CalendarDays,
  Clock3,
  RefreshCw,
  BookOpen,
} from "lucide-react";

export default function StudentClasses() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchMyClasses();

      console.log(
        "Student Classes:",
        res
      );

      setClasses(
        Array.isArray(res)
          ? res.filter(Boolean)
          : []
      );

    } catch (err) {
      console.error(
        "Error loading classes:",
        err
      );

      setError(
        "Unable to load classes."
      );

      setClasses([]);

    } finally {
      setLoading(false);
    }
  };


  const formatDate = (value) => {
    if (!value) {
      return "Not scheduled";
    }

    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Invalid date";
    }

    return date.toLocaleString();
  };


  const statusClass = (status) => {
    switch (
      status?.toUpperCase()
    ) {
      case "LIVE":
        return "student-class-live";

      case "COMPLETED":
        return "student-class-completed";

      default:
        return "student-class-scheduled";
    }
  };


  const joinClass = (classItem) => {
    if (!classItem?.roomId) {
      alert("Room is not available.");
      return;
    }

    navigate(
      `/live/${classItem.roomId}`
    );
  };


  return (
    <div className="student-dashboard-page">

      <div className="student-dashboard-header">

        <div>

          <div className="student-dashboard-label">

            <Video size={15} />

            LIVE LEARNING

          </div>

          <h1>
            Live Classes
          </h1>

          <p>
            View your scheduled sessions
            and join live classes.
          </p>

        </div>


        <button
          type="button"
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

          {loading
            ? "Loading..."
            : "Refresh"}

        </button>

      </div>


      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {loading ? (

        <div className="student-course-loading">

          <div
            className="spinner-border"
            role="status"
          />

          <span>
            Loading classes...
          </span>

        </div>

      ) : classes.length === 0 ? (

        <div className="student-overview-card">

          <div className="student-overview-icon">

            <CalendarDays
              size={24}
            />

          </div>

          <div>

            <h4>
              No scheduled classes
            </h4>

            <p>
              There are currently no
              upcoming live classes
              for your enrolled courses.
            </p>

          </div>

        </div>

      ) : (

        <div className="student-stats-grid">

          {classes.map(
            (
              classItem,
              index
            ) => (

              <div
                key={
                  classItem.id ??
                  index
                }
                className={`
                  student-stat-card
                  student-live-class-card
                  ${
                    index % 3 === 0
                      ? "student-stat-blue"
                      : index % 3 === 1
                      ? "student-stat-purple"
                      : "student-stat-green"
                  }
                `}
                style={{
                  animationDelay:
                    `${index * 80}ms`,
                }}
              >

                <div className="student-class-top">

                  <div className="student-stat-icon">

                    <Video
                      size={24}
                    />

                  </div>

                  <span
                    className={`student-class-status ${statusClass(
                      classItem.status
                    )}`}
                  >
                    {classItem.status ||
                      "SCHEDULED"}
                  </span>

                </div>


                <div className="student-class-content">

                  <div className="student-class-course">

                    <BookOpen
                      size={16}
                    />

                    <h3>
                      {classItem.course
                        ?.title ||
                        "Course"}
                    </h3>

                  </div>


                  <div className="student-class-time-row">

                    <Clock3
                      size={16}
                    />

                    <div>

                      <span>
                        Starts
                      </span>

                      <strong>
                        {formatDate(
                          classItem.startTime
                        )}
                      </strong>

                    </div>

                  </div>


                  <div className="student-class-time-row">

                    <Clock3
                      size={16}
                    />

                    <div>

                      <span>
                        Ends
                      </span>

                      <strong>
                        {formatDate(
                          classItem.endTime
                        )}
                      </strong>

                    </div>

                  </div>

                </div>


                <div className="student-class-footer">

                  {classItem.status ===
                    "LIVE" &&
                  classItem.roomId ? (

                    <button
                      type="button"
                      className="student-enroll-btn"
                      onClick={() =>
                        joinClass(
                          classItem
                        )
                      }
                    >

                      <Video
                        size={16}
                      />

                      Join Class

                    </button>

                  ) : classItem.status ===
                    "SCHEDULED" ? (

                    <button
                      type="button"
                      className="student-disabled-btn"
                      disabled
                    >
                      Class Not Started
                    </button>

                  ) : (

                    <button
                      type="button"
                      className="student-disabled-btn"
                      disabled
                    >
                      Class Unavailable
                    </button>

                  )}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}