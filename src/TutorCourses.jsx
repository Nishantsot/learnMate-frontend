import React, {
  useEffect,
  useState,
} from "react";

import {
  getTutorCourses,
  CreateTutorCourse,
  UdateTutorCourse,
  deleteTutorCourse,
} from "./authService";

import {
  BookOpen,
  PlusCircle,
  Pencil,
  Trash2,
  Clock3,
  IndianRupee,
  Layers3,
  Save,
  X,
} from "lucide-react";

import "./TutorCourses.css";

export default function TutorCourses() {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      category: "",
      price: "",
      durationMinutes: "",
    });

  useEffect(() => {
    loadCourses();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      price: "",
      durationMinutes: "",
    });

    setEditingId(null);
  };

  const loadCourses = async () => {
    try {
      setLoading(true);

      const data =
        await getTutorCourses();

      setCourses(
        data || []
      );

    } catch (error) {
      console.error(
        "Course load error:",
        error
      );

      setCourses([]);

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert(
        "Course title is required"
      );
      return;
    }

    if (
      Number(form.price) < 0
    ) {
      alert(
        "Price cannot be negative"
      );
      return;
    }

    if (
      form.durationMinutes &&
      Number(
        form.durationMinutes
      ) <= 0
    ) {
      alert(
        "Duration must be greater than 0"
      );
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title:
          form.title.trim(),

        description:
          form.description.trim(),

        category:
          form.category.trim(),

        price:
          Number(
            form.price
          ),

        durationMinutes:
          form.durationMinutes
            ? Number(
                form.durationMinutes
              )
            : null,
      };

      if (editingId) {
        await UdateTutorCourse(
          editingId,
          payload
        );
      } else {
        await CreateTutorCourse(
          payload
        );
      }

      resetForm();

      await loadCourses();

    } catch (error) {
      console.error(
        "Course save error:",
        error
      );

      alert(
        editingId
          ? "Failed to update course"
          : "Failed to create course"
      );

    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (course) => {
    setEditingId(
      course.id
    );

    setForm({
      title:
        course.title || "",

      description:
        course.description || "",

      category:
        course.category || "",

      price:
        course.price ?? "",

      durationMinutes:
        course.durationMinutes ??
        "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this course?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTutorCourse(
        id
      );

      if (
        editingId === id
      ) {
        resetForm();
      }

      await loadCourses();

    } catch (error) {
      console.error(
        "Delete course error:",
        error
      );

      alert(
        "Failed to delete course"
      );
    }
  };

  const statusClass = (
    status
  ) => {
    switch (
      status?.toUpperCase()
    ) {
      case "APPROVED":
        return "course-approved";

      case "REJECTED":
        return "course-rejected";

      default:
        return "course-pending";
    }
  };

  return (
    <div className="tutor-courses-page">

      {/* HEADER */}

      <div className="tutor-courses-header">

        <div>
          <p className="tutor-courses-overline">
            COURSE MANAGEMENT
          </p>

          <h2>
            Manage Your Courses
          </h2>

          <p>
            Create, edit and manage
            your LearnMate courses.
          </p>
        </div>

        <div className="tutor-courses-header-icon">
          <BookOpen
            size={31}
          />
        </div>

      </div>


      {/* CREATE / UPDATE */}

      <div className="course-form-card">

        <div className="course-form-heading">

          <div className="course-form-icon">
            {editingId ? (
              <Pencil
                size={21}
              />
            ) : (
              <PlusCircle
                size={21}
              />
            )}
          </div>

          <div>
            <h4>
              {editingId
                ? "Update Course"
                : "Create New Course"}
            </h4>

            <p>
              {editingId
                ? "Update course information and save your changes."
                : "Enter the course details to submit a new course."}
            </p>
          </div>

        </div>


        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="course-form-grid">

            {/* TITLE */}

            <div className="course-field">

              <label>
                Course Title
              </label>

              <div className="course-input-wrap">

                <BookOpen
                  size={17}
                />

                <input
                  type="text"
                  placeholder="Enter course title"

                  value={
                    form.title
                  }

                  onChange={(e) =>
                    setForm({
                      ...form,
                      title:
                        e.target.value,
                    })
                  }

                  required
                />

              </div>

            </div>


            {/* CATEGORY */}

            <div className="course-field">

              <label>
                Category
              </label>

              <div className="course-input-wrap">

                <Layers3
                  size={17}
                />

                <input
                  type="text"
                  placeholder="Example: Programming"

                  value={
                    form.category
                  }

                  onChange={(e) =>
                    setForm({
                      ...form,
                      category:
                        e.target.value,
                    })
                  }
                />

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="course-field course-field-full">

              <label>
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Enter course description"

                value={
                  form.description
                }

                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* PRICE */}

            <div className="course-field">

              <label>
                Price
              </label>

              <div className="course-input-wrap">

                <IndianRupee
                  size={17}
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"

                  placeholder="Course price"

                  value={
                    form.price
                  }

                  onChange={(e) =>
                    setForm({
                      ...form,
                      price:
                        e.target.value,
                    })
                  }

                  required
                />

              </div>

            </div>


            {/* DURATION */}

            <div className="course-field">

              <label>
                Duration
              </label>

              <div className="course-input-wrap">

                <Clock3
                  size={17}
                />

                <input
                  type="number"
                  min="1"

                  placeholder="Duration in minutes"

                  value={
                    form.durationMinutes
                  }

                  onChange={(e) =>
                    setForm({
                      ...form,
                      durationMinutes:
                        e.target.value,
                    })
                  }
                />

              </div>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="course-form-actions">

            <button
              type="submit"
              className="save-course-btn"
              disabled={
                submitting
              }
            >

              {editingId ? (
                <Save
                  size={18}
                />
              ) : (
                <PlusCircle
                  size={18}
                />
              )}

              {submitting
                ? "Saving..."
                : editingId
                ? "Update Course"
                : "Create Course"}

            </button>


            {editingId && (

              <button
                type="button"
                className="cancel-edit-btn"

                onClick={
                  resetForm
                }
              >

                <X size={18} />

                Cancel

              </button>

            )}

          </div>

        </form>

      </div>


      {/* COURSE LIST */}

      <div className="tutor-course-list-card">

        <div className="course-list-heading">

          <div>

            <p>
              YOUR COURSES
            </p>

            <h4>
              Course List
            </h4>

          </div>

          <div className="course-total-count">
            {courses.length}
          </div>

        </div>


        {loading ? (

          <div className="course-loading">

            <div
              className="spinner-border"
              role="status"
            />

            <span>
              Loading courses...
            </span>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="tutor-course-table">

              <thead>

                <tr>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {courses.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="course-empty"
                    >

                      <BookOpen
                        size={34}
                      />

                      <span>
                        No courses found
                      </span>

                    </td>

                  </tr>

                ) : (

                  courses.map(
                    (course) => (

                      <tr
                        key={
                          course.id
                        }
                      >

                        {/* COURSE */}

                        <td>

                          <div className="tutor-course-name">

                            <div className="tutor-course-icon">

                              <BookOpen
                                size={17}
                              />

                            </div>

                            <div>

                              <strong>
                                {
                                  course.title
                                }
                              </strong>

                              <small>
                                {course.description
                                  ? course.description
                                      .length >
                                    55
                                    ? `${course.description.slice(
                                        0,
                                        55
                                      )}...`
                                    : course.description
                                  : "No description"}
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* CATEGORY */}

                        <td>

                          <span className="course-category-badge">

                            {
                              course.category ||
                              "General"
                            }

                          </span>

                        </td>


                        {/* DURATION */}

                        <td>

                          <span className="course-duration">

                            <Clock3
                              size={14}
                            />

                            {
                              course.durationMinutes ||
                              0
                            }{" "}
                            min

                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`tutor-course-status ${statusClass(
                              course.status
                            )}`}
                          >

                            {
                              course.status ||
                              "PENDING"
                            }

                          </span>

                        </td>


                        {/* PRICE */}

                        <td>

                          <strong className="course-price">

                            ₹
                            {Number(
                              course.price ||
                              0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="tutor-course-actions">

                            <button
                              type="button"
                              className="edit-course-btn"

                              onClick={() =>
                                handleEdit(
                                  course
                                )
                              }
                            >

                              <Pencil
                                size={15}
                              />

                              Edit

                            </button>


                            <button
                              type="button"
                              className="delete-course-btn"

                              onClick={() =>
                                handleDelete(
                                  course.id
                                )
                              }
                            >

                              <Trash2
                                size={15}
                              />

                              Delete

                            </button>

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