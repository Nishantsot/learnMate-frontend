import { useEffect, useState } from "react";
import { fetchMyCourses } from "./authService";
import {
  BookOpen,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

export default function StudentMyCourses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);


  const load = async () => {

    try {

      setLoading(true);

      const res = await fetchMyCourses();

      console.log("My Courses:", res);

      setCourses(res || []);

    } catch (err) {

      console.error(
        "Error loading courses:",
        err
      );

      setCourses([]);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="student-dashboard-page">


      

      <div className="student-dashboard-header">

        <div>

          <div className="student-dashboard-label">

            <GraduationCap size={15} />

            STUDENT LEARNING

          </div>


          <h1>
            My Courses
          </h1>


          <p>
            View and continue your enrolled courses.
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
            : "Refresh"
          }

        </button>

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {!loading && courses.length === 0 && (

        <div className="student-overview-card">

          <div className="student-overview-icon">

            <BookOpen size={23} />

          </div>

          <div>

            <h4>
              No enrolled courses
            </h4>

            <p>
              You haven't enrolled in any
              courses yet.
            </p>

          </div>

        </div>

      )}


   

      {courses.length > 0 && (

        <div className="student-stats-grid">

          {courses.map((item, index) => {

            const course =
              item.course || {};

            return (

              <div
                className={`
                  student-stat-card
                  student-course-card
                  ${
                    index % 3 === 0
                      ? "student-stat-blue"
                      : index % 3 === 1
                      ? "student-stat-purple"
                      : "student-stat-green"
                  }
                `}
                key={item.id}
                style={{
                  animationDelay:
                    `${index * 80}ms`,
                }}
              >

                {/* ICON */}

                <div className="student-stat-icon">

                  <BookOpen size={24} />

                </div>


                {/* COURSE INFO */}

                <div className="student-stat-content">

                  <span>
                    Enrolled Course
                  </span>

                  <h2 className="student-course-title">

                    {course.title ||
                      "Course"}

                  </h2>

                  <p className="student-course-description">

                    {course.description ||
                      "No description available."}

                  </p>


                  {/* CATEGORY */}

                  {course.category && (

                    <span className="student-course-category">

                      {course.category}

                    </span>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      )}


     
      {courses.length > 0 && (

        <div className="student-overview-card">

          <div className="student-overview-icon">

            <GraduationCap size={24} />

          </div>


          <div>

            <h4>
              Learning Overview
            </h4>

            <p>

              You are currently enrolled in{" "}

              <strong>
                {courses.length}
              </strong>{" "}

              course
              {courses.length !== 1
                ? "s"
                : ""}.

            </p>

          </div>

        </div>

      )}

    </div>

  );

}