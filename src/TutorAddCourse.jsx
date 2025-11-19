import React, { useState } from "react";
import { addCourse } from "./authService";

const TutorAddCourse = ({ onCreated }) => {
  const [course, setCourse] = useState({
    title: "",
    category: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const save = async (e) => {
    e.preventDefault();

    if (!course.title || !course.category || !course.price) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      await addCourse(course);
      alert("✅ Course added successfully!");
      setCourse({ title: "", category: "", price: "" });
      onCreated();
    } catch (err) {
      alert(err.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>➕ Add New Course</h3>

      <form className="mt-3" onSubmit={save}>
        <input
          className="form-control mb-3"
          placeholder="Course Title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          value={course.category}
          onChange={(e) => setCourse({ ...course, category: e.target.value })}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          value={course.price}
          onChange={(e) => setCourse({ ...course, price: e.target.value })}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default TutorAddCourse;
