import React, {
  useEffect,
  useState,
} from "react";

import {
  addTutorMaterial,
  getTutorMaterials,
  getTutorCourses,
} from "./authService";

import {
  BookOpen,
  FileText,
  Link as LinkIcon,
  PlusCircle,
  ExternalLink,
  Layers3,
} from "lucide-react";

import "./TutorCourses.css";


export default function TutorMaterials() {

  const [courses, setCourses] =
    useState([]);

  const [materials, setMaterials] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [form, setForm] =
    useState({
      courseId: "",
      title: "",
      url: "",
    });


  useEffect(() => {
    loadCourses();
  }, []);


  const loadCourses = async () => {
    try {

      const data =
        await getTutorCourses();

      setCourses(
        data || []
      );

    } catch (error) {

      console.error(
        "Courses load error:",
        error
      );

      setCourses([]);
    }
  };


  const loadMaterials = async (
    courseId
  ) => {

    if (!courseId) {

      setMaterials([]);

      return;
    }

    try {

      setLoading(true);

      const data =
        await getTutorMaterials(
          courseId
        );

      setMaterials(
        data || []
      );

    } catch (error) {

      console.error(
        "Materials load error:",
        error
      );

      setMaterials([]);

    } finally {

      setLoading(false);
    }
  };


  const handleCourseChange = (
    e
  ) => {

    const courseId =
      e.target.value;

    setForm({
      ...form,
      courseId,
    });

    loadMaterials(
      courseId
    );
  };


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (
      !form.courseId ||
      !form.title.trim() ||
      !form.url.trim()
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      setSubmitting(true);

      await addTutorMaterial(
        form.courseId,
        form.title.trim(),
        form.url.trim()
      );

      setForm({
        ...form,
        title: "",
        url: "",
      });

      await loadMaterials(
        form.courseId
      );

    } catch (error) {

      console.error(
        "Add material error:",
        error
      );

      alert(
        "Failed to add material"
      );

    } finally {

      setSubmitting(false);
    }
  };


  const selectedCourse =
    courses.find(
      (course) =>
        String(course.id) ===
        String(form.courseId)
    );


  return (

    <div className="tutor-courses-page">

      {/* HEADER */}

      <div className="tutor-courses-header">

        <div>

          <p className="tutor-courses-overline">
            COURSE MATERIALS
          </p>

          <h2>
            Manage Study Materials
          </h2>

          <p>
            Add and manage useful
            learning resources for
            your courses.
          </p>

        </div>


        <div className="tutor-courses-header-icon">

          <FileText
            size={31}
          />

        </div>

      </div>


      {/* ADD MATERIAL CARD */}

      <div className="course-form-card">

        <div className="course-form-heading">

          <div className="course-form-icon">

            <PlusCircle
              size={21}
            />

          </div>


          <div>

            <h4>
              Add New Material
            </h4>

            <p>
              Select a course and
              add a study resource URL.
            </p>

          </div>

        </div>


        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="course-form-grid">

            {/* COURSE */}

            <div className="course-field">

              <label>
                Course
              </label>

              <div className="course-input-wrap">

                <Layers3
                  size={17}
                />

                <select
                  value={
                    form.courseId
                  }

                  onChange={
                    handleCourseChange
                  }

                  required
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

            </div>


            {/* TITLE */}

            <div className="course-field">

              <label>
                Material Title
              </label>

              <div className="course-input-wrap">

                <BookOpen
                  size={17}
                />

                <input
                  type="text"

                  placeholder="Example: Java Notes"

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


            {/* URL */}

            <div className="course-field course-field-full">

              <label>
                Material URL
              </label>

              <div className="course-input-wrap">

                <LinkIcon
                  size={17}
                />

                <input
                  type="url"

                  placeholder="https://example.com/material"

                  value={
                    form.url
                  }

                  onChange={(e) =>
                    setForm({
                      ...form,
                      url:
                        e.target.value,
                    })
                  }

                  required
                />

              </div>

            </div>

          </div>


          <div className="course-form-actions">

            <button
              type="submit"

              className="save-course-btn"

              disabled={
                submitting
              }
            >

              <PlusCircle
                size={18}
              />

              {submitting
                ? "Adding..."
                : "Add Material"}

            </button>

          </div>

        </form>

      </div>


      {/* MATERIAL LIST */}

      <div className="tutor-course-list-card">

        <div className="course-list-heading">

          <div>

            <p>
              STUDY RESOURCES
            </p>

            <h4>
              {selectedCourse
                ? `${selectedCourse.title} Materials`
                : "Course Materials"}
            </h4>

          </div>


          <div className="course-total-count">

            {materials.length}

          </div>

        </div>


        {loading ? (

          <div className="course-loading">

            <div
              className="spinner-border"
              role="status"
            />

            <span>
              Loading materials...
            </span>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="tutor-course-table">

              <thead>

                <tr>
                  <th>Material</th>
                  <th>Link</th>
                </tr>

              </thead>


              <tbody>

                {materials.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="2"
                      className="course-empty"
                    >

                      <FileText
                        size={34}
                      />

                      <span>
                        {form.courseId
                          ? "No materials found"
                          : "Select a course to view materials"}
                      </span>

                    </td>

                  </tr>

                ) : (

                  materials.map(
                    (material) => (

                      <tr
                        key={
                          material.id
                        }
                      >

                        {/* MATERIAL */}

                        <td>

                          <div className="tutor-course-name">

                            <div className="tutor-course-icon">

                              <FileText
                                size={17}
                              />

                            </div>


                            <div>

                              <strong>
                                {
                                  material.title
                                }
                              </strong>

                              <small>
                                Study Material
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* LINK */}

                        <td>

                          <a
                            href={
                              material.url
                            }

                            target="_blank"

                            rel="noreferrer"

                            className="edit-course-btn"

                            style={{
                              textDecoration:
                                "none",
                            }}
                          >

                            <ExternalLink
                              size={15}
                            />

                            View Material

                          </a>

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