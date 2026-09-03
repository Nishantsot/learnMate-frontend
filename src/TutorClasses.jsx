import React, { useEffect, useState } from "react";

import {
  scheduleTutorClass,
  getUpcomingTutorClasses,
  completeTutorClass,
  getTutorCourses,
  startTutorClass,
} from "./authService";

import {
  Video,
  CalendarPlus,
  Play,
  CheckCircle2,
  Clock3,
  BookOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./TutorClasses.css";

export default function TutorClasses() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    courseId: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [sessionData, courseData] =
        await Promise.all([
          getUpcomingTutorClasses(),
          getTutorCourses(),
        ]);

      setSessions(sessionData || []);
      setCourses(courseData || []);
    } catch (err) {
      console.error("Tutor class load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.courseId ||
      !form.startTime ||
      !form.endTime
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      new Date(form.endTime) <=
      new Date(form.startTime)
    ) {
      alert(
        "End time must be after start time"
      );
      return;
    }

    try {
      const payload = {
        courseId: Number(form.courseId),
        startTime: `${form.startTime}:00`,
        endTime: `${form.endTime}:00`,
      };

      await scheduleTutorClass(payload);

      setForm({
        courseId: "",
        startTime: "",
        endTime: "",
      });

      await loadData();

      alert(
        "Class scheduled successfully"
      );
    } catch (err) {
      console.error(
        "Schedule error:",
        err
      );

      alert(
        "Failed to schedule class"
      );
    }
  };

  const markComplete = async (id) => {
    try {
      await completeTutorClass(id);

      await loadData();
    } catch (err) {
      console.error(
        "Complete class error:",
        err
      );

      alert(
        "Failed to complete class"
      );
    }
  };

  const startClass = async (
    session
  ) => {
    try {
      await startTutorClass(
        session.id
      );

      await loadData();

      navigate(
        `/tutor/live/${session.roomId}`
      );
    } catch (err) {
      console.error(
        "Start class error:",
        err
      );

      alert(
        "Failed to start class"
      );
    }
  };

  const statusClass = (
    status
  ) => {
    switch (
      status?.toUpperCase()
    ) {
      case "LIVE":
        return "session-live";

      case "COMPLETED":
        return "session-completed";

      default:
        return "session-scheduled";
    }
  };

  return (
    <div className="tutor-classes-page">

      {/* HEADER */}

      <div className="tutor-classes-header">

        <div>
          <p className="tutor-classes-overline">
            LIVE LEARNING
          </p>

          <h2>
            Live Classes Management
          </h2>

          <p>
            Schedule, start and manage
            your LearnMate live sessions.
          </p>
        </div>

        <div className="tutor-classes-header-icon">
          <Video size={31} />
        </div>

      </div>


      {/* SCHEDULE CARD */}

      <div className="schedule-class-card">

        <div className="schedule-card-heading">

          <div className="schedule-heading-icon">
            <CalendarPlus
              size={22}
            />
          </div>

          <div>
            <h4>
              Schedule New Class
            </h4>

            <p>
              Select a course and
              choose class timing.
            </p>
          </div>

        </div>


        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="schedule-form-grid">

            {/* COURSE */}

            <div className="schedule-field">

              <label>
                Course
              </label>

              <select
                required
                value={
                  form.courseId
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    courseId:
                      e.target.value,
                  })
                }
              >

                <option value="">
                  Select Course
                </option>

                {courses.map(
                  (course) => (

                    <option
                      key={
                        course.id
                      }
                      value={
                        course.id
                      }
                    >
                      {
                        course.title
                      }
                    </option>

                  )
                )}

              </select>

            </div>


            {/* START */}

            <div className="schedule-field">

              <label>
                Start Time
              </label>

              <input
                type="datetime-local"
                required
                value={
                  form.startTime
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    startTime:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* END */}

            <div className="schedule-field">

              <label>
                End Time
              </label>

              <input
                type="datetime-local"
                required
                value={
                  form.endTime
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    endTime:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* BUTTON */}

            <div className="schedule-submit-wrap">

              <button
                type="submit"
                className="schedule-class-btn"
              >
                <CalendarPlus
                  size={18}
                />

                Schedule
              </button>

            </div>

          </div>

        </form>

      </div>


      {/* SESSION CARD */}

      <div className="sessions-card">

        <div className="sessions-card-header">

          <div>

            <p>
              CLASS SESSIONS
            </p>

            <h4>
              Upcoming Sessions
            </h4>

          </div>

          <div className="session-count">
            {sessions.length}
          </div>

        </div>


        {loading ? (

          <div className="tutor-classes-loading">

            <div
              className="spinner-border"
              role="status"
            />

            <span>
              Loading sessions...
            </span>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="tutor-session-table">

              <thead>
                <tr>
                  <th>Course</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>


              <tbody>

                {sessions.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="session-empty"
                    >

                      <Video
                        size={34}
                      />

                      <span>
                        No scheduled sessions found
                      </span>

                    </td>

                  </tr>

                ) : (

                  sessions.map(
                    (session) => (

                      <tr
                        key={
                          session.id
                        }
                      >

                        {/* COURSE */}

                        <td>

                          <div className="session-course">

                            <div className="session-course-icon">

                              <BookOpen
                                size={17}
                              />

                            </div>

                            <span>
                              {
                                session.course
                                  ?.title ||
                                "Course"
                              }
                            </span>

                          </div>

                        </td>


                        {/* START */}

                        <td>

                          <div className="session-time">

                            <Clock3
                              size={15}
                            />

                            <span>
                              {new Date(
                                session.startTime
                              ).toLocaleString()}
                            </span>

                          </div>

                        </td>


                        {/* END */}

                        <td>

                          {new Date(
                            session.endTime
                          ).toLocaleString()}

                        </td>


                        {/* ROOM */}

                        <td>

                          <span className="room-code">
                            {
                              session.roomId
                            }
                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`session-status ${statusClass(
                              session.status
                            )}`}
                          >
                            {
                              session.status
                            }
                          </span>

                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="session-actions">

                            {session.status ===
                              "SCHEDULED" && (

                              <button
                                className="session-start-btn"
                                onClick={() =>
                                  startClass(
                                    session
                                  )
                                }
                              >
                                <Play
                                  size={15}
                                />

                                Start
                              </button>

                            )}


                            {session.status ===
                              "LIVE" && (

                              <button
                                className="session-join-btn"
                                onClick={() =>
                                  navigate(
                                    `/tutor/live/${session.roomId}`
                                  )
                                }
                              >
                                <Video
                                  size={15}
                                />

                                Join
                              </button>

                            )}


                            {session.status !==
                              "COMPLETED" && (

                              <button
                                className="session-complete-btn"
                                onClick={() =>
                                  markComplete(
                                    session.id
                                  )
                                }
                              >
                                <CheckCircle2
                                  size={15}
                                />

                                Complete
                              </button>

                            )}


                            {session.status ===
                              "COMPLETED" && (

                              <span className="completed-label">

                                <CheckCircle2
                                  size={16}
                                />

                                Completed

                              </span>

                            )}

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}