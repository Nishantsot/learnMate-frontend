import { useEffect, useState } from "react";

import {
  fetchAllCourses,
  enrollCourse,
} from "./authService";

import {
  BookOpen,
  GraduationCap,
  RefreshCw,
  IndianRupee,
} from "lucide-react";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const res = await fetchAllCourses();

      setCourses(
        Array.isArray(res) ? res : []
      );
    } catch (error) {
      console.error(
        "Error loading courses:",
        error
      );

      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const enroll = async (id) => {
    try {
      setEnrollingId(id);

      await enrollCourse(id);

      alert(
        "Course enrolled successfully!"
      );
    } catch (error) {
      console.error(
        "Enrollment error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to enroll in this course."
      );
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="student-dashboard-page">

      {/* HEADER */}

      <div className="student-dashboard-header">

        <div>

          <div className="student-dashboard-label">

            <GraduationCap size={15} />

            COURSE CATALOG

          </div>

          <h1>
            Browse Courses
          </h1>

          <p>
            Explore approved courses and
            enroll in the ones you want
            to learn.
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

          {loading
            ? "Loading..."
            : "Refresh"}

        </button>

      </div>


      {/* LOADING */}

      {loading ? (

        <div className="student-course-loading">

          <div
            className="spinner-border"
            role="status"
          />

          <span>
            Loading courses...
          </span>

        </div>

      ) : courses.length === 0 ? (

        <div className="student-overview-card">

          <div className="student-overview-icon">

            <BookOpen size={23} />

          </div>

          <div>

            <h4>
              No courses available
            </h4>

            <p>
              There are currently no
              approved courses available.
            </p>

          </div>

        </div>

      ) : (

        <div className="student-stats-grid">

          {courses.map(
            (course, index) => (

              <div
                key={course.id}
                className={`
                  student-stat-card
                  student-browse-course-card
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

                <div className="student-course-card-top">

                  <div className="student-stat-icon">

                    <BookOpen size={24} />

                  </div>

                  {course.category && (

                    <span className="student-course-category">

                      {course.category}

                    </span>

                  )}

                </div>


                <div className="student-browse-content">

                  <h3>
                    {course.title ||
                      "Course"}
                  </h3>

                  <p>
                    {course.description ||
                      "Course description not available."}
                  </p>

                </div>


                <div className="student-course-footer">

                  <div className="student-course-price">

                    <IndianRupee size={18} />

                    <span>
                      {Number(
                        course.price || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>


                  <button
                    type="button"
                    className="student-enroll-btn"
                    onClick={() =>
                      enroll(course.id)
                    }
                    disabled={
                      enrollingId ===
                      course.id
                    }
                  >

                    {enrollingId ===
                    course.id
                      ? "Enrolling..."
                      : "Enroll Now"}

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}