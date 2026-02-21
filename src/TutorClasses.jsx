import React, { useEffect, useState } from "react";

import {
  scheduleTutorClass,
  getUpcomingTutorClasses,
  completeTutorClass,
  getTutorCourses,
    startTutorClass 
} from "./authService";

import { useNavigate } from "react-router-dom";


export default function TutorClasses() {

  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    courseId: "",
    startTime: "",
    endTime: ""
  });



  useEffect(() => {

    loadSessions();
    loadCourses();

  }, []);



  // LOAD SESSIONS
  const loadSessions = async () => {

    try {

      const data = await getUpcomingTutorClasses();

      console.log("Sessions:", data);

      setSessions(data);

    }
    catch (err) {

      console.error(err);

    }

  };



  // LOAD COURSES
  const loadCourses = async () => {

    try {

      const data = await getTutorCourses();

      setCourses(data);

    }
    catch (err) {

      console.error(err);

    }

  };



  // SCHEDULE CLASS
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        courseId: Number(form.courseId),

        startTime: form.startTime + ":00",

        endTime: form.endTime + ":00"

      };

      console.log("Scheduling:", payload);

      await scheduleTutorClass(payload);

      alert("Class Scheduled Successfully ✅");

      setForm({
        courseId: "",
        startTime: "",
        endTime: ""
      });

      loadSessions();

    }
    catch (err) {

      console.error(err);

      alert("Failed to schedule class");

    }

  };



  // COMPLETE CLASS
  const markComplete = async (id) => {

    await completeTutorClass(id);

    loadSessions();

  };



  return (

    <div className="container-fluid py-4 px-4">


      {/* HEADER */}

      <h2 className="fw-bold text-white mb-4">

        🎥 Live Classes Management

      </h2>



      {/* SCHEDULE FORM */}

      <div className="card shadow-lg mb-4">

        <div className="card-body">

          <h5 className="mb-3">Schedule New Class</h5>

          <form onSubmit={handleSubmit}>

            <div className="row g-3">


              <div className="col-md-4">

                <select
                  className="form-select"
                  required
                  value={form.courseId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      courseId: e.target.value
                    })
                  }
                >

                  <option value="">

                    Select Course

                  </option>

                  {courses.map((c) => (

                    <option key={c.id} value={c.id}>

                      {c.title}

                    </option>

                  ))}

                </select>

              </div>



              <div className="col-md-3">

                <input
                  type="datetime-local"
                  className="form-control"
                  required
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      startTime: e.target.value
                    })
                  }
                />

              </div>



              <div className="col-md-3">

                <input
                  type="datetime-local"
                  className="form-control"
                  required
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      endTime: e.target.value
                    })
                  }
                />

              </div>



              <div className="col-md-2">

                <button className="btn btn-primary w-100">

                  Schedule

                </button>

              </div>


            </div>

          </form>

        </div>

      </div>



      {/* SESSION TABLE */}

      <div className="card shadow-lg">

        <div className="card-body">

          <h5>All Sessions</h5>


          <table className="table">

            <thead>

              <tr>

                <th>Course</th>
                <th>Start</th>
                <th>End</th>
                <th>Room</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>


            <tbody>


              {sessions.length === 0 && (

                <tr>

                  <td colSpan="6">

                    No Sessions Found

                  </td>

                </tr>

              )}



              {sessions.map((s) => (

                <tr key={s.id}>

                  <td>{s.course?.title}</td>

                  <td>

                    {new Date(s.startTime).toLocaleString()}

                  </td>

                  <td>

                    {new Date(s.endTime).toLocaleString()}

                  </td>

                  <td>{s.roomId}</td>

                  <td>{s.status}</td>

<td>

{/* START BUTTON */}

{s.status === "SCHEDULED" && (

<button
className="btn btn-success btn-sm me-2"
onClick={async () => {

await startTutorClass(s.id);

loadSessions();

navigate(`/tutor/live/${s.roomId}`);

}}
>

Start Class

</button>

)}



{/* JOIN BUTTON */}

{s.status === "LIVE" && (

<button
className="btn btn-primary btn-sm me-2"
onClick={() =>
navigate(`/tutor/live/${s.roomId}`)
}
>

Join Live

</button>

)}



{/* COMPLETE BUTTON */}

{s.status !== "COMPLETED" && (

<button
className="btn btn-danger btn-sm"
onClick={() => markComplete(s.id)}
>

Complete

</button>

)}



{/* COMPLETED TEXT */}

{s.status === "COMPLETED" && (

<span className="text-muted">

Completed

</span>

)}


</td>


                </tr>

              ))}


            </tbody>

          </table>


        </div>

      </div>


    </div>

  );

}