import { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

import {
  fetchMyCourses,
  getStudentMaterials,
} from "./authService";

export default function StudentMaterials() {
  const [courses, setCourses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchMyCourses();

      const enrolledCourses =
        Array.isArray(data)
          ? data
              .map((item) => item.course)
              .filter(Boolean)
          : [];

      setCourses(enrolledCourses);
    } catch (error) {
      console.error(
        "Student course load error:",
        error
      );

      setCourses([]);
    }
  };

  const loadMaterials = async (courseId) => {
    if (!courseId) {
      setMaterials([]);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getStudentMaterials(
          courseId
        );

      setMaterials(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Student material load error:",
        error
      );

      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;

    setSelectedCourse(courseId);

    loadMaterials(courseId);
  };

  return (
    <div className="student-dashboard-page">

      <div className="student-dashboard-header">

        <div>

          <div className="student-dashboard-label">
            <FileText size={15} />
            LEARNING MATERIALS
          </div>

          <h1>
            Course Materials
          </h1>

          <p>
            Access study materials shared
            by your tutors.
          </p>

        </div>


        <button
          type="button"
          className="student-refresh-btn"
          onClick={() =>
            loadMaterials(
              selectedCourse
            )
          }
          disabled={
            loading ||
            !selectedCourse
          }
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


      <div className="student-overview-card">

        <div className="student-overview-icon">
          <BookOpen size={24} />
        </div>

        <div style={{ width: "100%" }}>

          <h4>
            Select Course
          </h4>

          <select
            className="form-select mt-3"
            value={selectedCourse}
            onChange={
              handleCourseChange
            }
          >
            <option value="">
              Select enrolled course
            </option>

            {courses.map(
              (course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.title}
                </option>
              )
            )}
          </select>

        </div>

      </div>


      {loading ? (

        <div className="student-course-loading mt-4">

          <div
            className="spinner-border"
            role="status"
          />

          <span>
            Loading materials...
          </span>

        </div>

      ) : materials.length === 0 ? (

        selectedCourse && (
          <div className="student-overview-card mt-4">

            <div className="student-overview-icon">
              <FileText size={24} />
            </div>

            <div>
              <h4>
                No materials found
              </h4>

              <p>
                Tutor has not added
                materials for this
                course yet.
              </p>
            </div>

          </div>
        )

      ) : (

        <div className="student-stats-grid mt-4">

          {materials.map(
            (material, index) => (

              <div
                key={
                  material.id ??
                  index
                }
                className={`
                  student-stat-card
                  ${
                    index % 3 === 0
                      ? "student-stat-blue"
                      : index % 3 === 1
                      ? "student-stat-purple"
                      : "student-stat-green"
                  }
                `}
              >

                <div className="student-stat-icon">
                  <FileText size={23} />
                </div>

                <div className="student-stat-content">

                  <span>
                    Study Material
                  </span>

                  <h3 className="mt-2">
                    {material.title}
                  </h3>

                  {material.url && (
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noreferrer"
                      className="student-enroll-btn mt-3"
                      style={{
                        display:
                          "inline-flex",
                        textDecoration:
                          "none",
                      }}
                    >
                      <ExternalLink
                        size={16}
                      />

                      Open Material
                    </a>
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