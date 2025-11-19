import React from "react";
import { completeClass } from "./authService";

const TutorClasses = ({ sessions, reload }) => {
  const complete = async (id) => {
    try {
      await completeClass(id);
      alert("Class marked completed!");
      reload();
    } catch (err) {
      alert(err.message || "Failed to mark class completed");
    }
  };

  return (
    <div>
      <h3>🎥 Upcoming Classes</h3>

      {sessions.length === 0 ? (
        <p>No live classes scheduled.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Room</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.course?.title}</td>
                <td>{s.roomId}</td>
                <td>{s.sessionDate}</td>
                <td>{s.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => complete(s.id)}
                    disabled={s.status === "COMPLETED"}
                  >
                    {s.status === "COMPLETED"
                      ? "Completed"
                      : "Mark Completed"}
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

export default TutorClasses;
