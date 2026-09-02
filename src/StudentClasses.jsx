import { useEffect, useState } from "react";
import { fetchMyClasses } from "./authService";

export default function StudentClasses() {
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

      console.log("Student Classes:", res);

      // Make sure response is always a valid array
      if (Array.isArray(res)) {
        setClasses(res.filter(Boolean));
      } else {
        setClasses([]);
      }
    } catch (err) {
      console.error("Error loading classes:", err);

      setError("Unable to load classes.");
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  // Safe date formatter
  const formatDate = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleString();
  };

  if (loading) {
    return (
      <div className="content-area">
        <h3 className="mb-4">Live Classes</h3>
        <p>Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="content-area">
      <h3 className="mb-4">Live Classes</h3>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {classes.length === 0 ? (
        <div className="alert alert-info">
          No scheduled classes available.
        </div>
      ) : (
        <div className="row g-3">
          {classes.map((classItem, index) => {
            if (!classItem) {
              return null;
            }

            return (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                key={classItem.id ?? index}
              >
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5>
                      {classItem.course?.title || "Course"}
                    </h5>

                    <p className="text-muted">
                      Start: {formatDate(classItem.startTime)}
                    </p>

                    <p className="text-muted">
                      End: {formatDate(classItem.endTime)}
                    </p>

                    <p>
                      Status:{" "}
                      <span className="fw-semibold">
                        {classItem.status || "Unknown"}
                      </span>
                    </p>

                    {classItem.roomId ? (
                      <a
                        href={`/tutor/live/${classItem.roomId}`}
                        className="btn btn-success"
                      >
                        Join Class
                      </a>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        disabled
                      >
                        Room Not Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}