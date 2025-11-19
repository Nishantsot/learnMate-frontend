import React, { useState } from "react";
import { deleteCourse } from "./authService";

const TutorCourses = ({ courses, reload }) => {
  const [loadingId, setLoadingId] = useState(null);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      setLoadingId(id);
      await deleteCourse(id);
      reload();
    } catch (err) {
      alert(err.message || "Failed to delete course");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h3>📘 My Courses</h3>

      {courses.length === 0 ? (
        <p className="mt-3 text-muted">No courses found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>₹{c.price}</td>
                <td>
                  {c.approved ? (
                    <span className="text-success fw-bold">✔ Approved</span>
                  ) : (
                    <span className="text-warning fw-bold">⏳ Pending Approval</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => remove(c.id)}
                    disabled={loadingId === c.id}
                  >
                    {loadingId === c.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TutorCourses;
