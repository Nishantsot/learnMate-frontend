import { useEffect, useState } from "react";
import {
  fetchAllCourses,
  enrollCourse,
} from "./authService";

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

      setCourses(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Error loading courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const enroll = async (id) => {
    try {
      setEnrollingId(id);

      await enrollCourse(id);

      alert("Course enrolled successfully!");
    } catch (error) {
      console.error("Enrollment error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to enroll in this course."
      );
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="content-area">

      <h3 className="mb-4 text-dark fw-bold">
        Browse Courses
      </h3>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          />
          <p className="mt-3 text-secondary">
            Loading courses...
          </p>
        </div>
      ) : courses.length === 0 ? (
        <div className="alert alert-info">
          No courses available.
        </div>
      ) : (
        <div className="row g-4">

          {courses.map((c) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              key={c.id}
            >

              <div
                className="card border-0 shadow h-100"
                style={{
                  background:
                    "linear-gradient(145deg, #ffffff, #f1f5ff)",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >

                {/* Top Color */}
                <div
                  style={{
                    height: "6px",
                    background:
                      "linear-gradient(90deg, #0d6efd, #6610f2)",
                  }}
                />

                <div className="card-body d-flex flex-column p-4">

                  {/* Category */}
                  {c.category && (
                    <span
                      className="badge bg-primary-subtle text-primary mb-3"
                      style={{
                        width: "fit-content",
                      }}
                    >
                      {c.category}
                    </span>
                  )}

                  {/* Course Title */}
                  <h5
                    className="fw-bold mb-3"
                    style={{
                      color: "#172033",
                    }}
                  >
                    {c.title}
                  </h5>

                  {/* Description */}
                  <p
                    className="flex-grow-1"
                    style={{
                      color: "#64748b",
                      lineHeight: "1.6",
                    }}
                  >
                    {c.description ||
                      "Course description not available."}
                  </p>

                  {/* Price */}
                  <div className="mb-3">
                    <span
                      className="fw-bold fs-5"
                      style={{
                        color: "#198754",
                      }}
                    >
                      ₹{c.price ?? 0}
                    </span>
                  </div>

                  {/* Enroll */}
                  <button
                    className="btn btn-primary w-100 fw-semibold"
                    style={{
                      borderRadius: "10px",
                    }}
                    onClick={() => enroll(c.id)}
                    disabled={enrollingId === c.id}
                  >
                    {enrollingId === c.id
                      ? "Enrolling..."
                      : "Enroll Now"}
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}