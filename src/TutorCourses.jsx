import React, { useEffect, useState } from "react";
import {
  getTutorCourses,
  CreateTutorCourse,
  UdateTutorCourse,
  deleteTutorCourse,
} from "./authService";

export default function TutorCourses() {

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    durationMinutes: ""
  });

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {

    loadCourses();

  }, []);



  const loadCourses = async () => {

    const data = await getTutorCourses();

    setCourses(data);

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editingId)
      await UdateTutorCourse(editingId, form);

    else
      await CreateTutorCourse(form);


    setForm({
      title: "",
      description: "",
      category: "",
      price: "",
      durationMinutes: ""
    });

    setEditingId(null);

    loadCourses();

  };



  const handleEdit = (course) => {

    setForm(course);

    setEditingId(course.id);

  };



  const handleDelete = async (id) => {

    if (!window.confirm("Delete this course?")) return;

    await deleteTutorCourse(id);

    loadCourses();

  };



  return (


<div className="container-fluid py-4 px-4">


{/* HEADER */}


<div className="d-flex justify-content-between align-items-center mb-4">


<h2 className="fw-bold text-white">
 Course Management
</h2>


</div>



{/* FORM CARD */}



<div className="card border-0 shadow-lg rounded-4 mb-5">


<div className="card-body p-4">


<h5 className="fw-semibold mb-3">

{editingId ? "Update Course" : "Create New Course"}

</h5>


<form onSubmit={handleSubmit}>


<div className="row g-3">


<div className="col-md-6">

<input

className="form-control form-control-lg"

placeholder="Course Title"

value={form.title}

onChange={(e)=>setForm({...form,title:e.target.value})}

required

/>

</div>



<div className="col-md-6">

<input

className="form-control form-control-lg"

placeholder="Category"

value={form.category}

onChange={(e)=>setForm({...form,category:e.target.value})}

/>

</div>



<div className="col-md-12">

<textarea

className="form-control form-control-lg"

placeholder="Course Description"

value={form.description}

onChange={(e)=>setForm({...form,description:e.target.value})}

/>

</div>



<div className="col-md-6">

<input

type="number"

className="form-control form-control-lg"

placeholder="Price ₹"

value={form.price}

onChange={(e)=>setForm({...form,price:e.target.value})}

required

/>

</div>



<div className="col-md-6">

<input

type="number"

className="form-control form-control-lg"

placeholder="Duration (Minutes)"

value={form.durationMinutes}

onChange={(e)=>setForm({...form,durationMinutes:e.target.value})}

/>

</div>


</div>



<button className="btn btn-primary btn-lg mt-4 px-5 rounded-pill">

{editingId ? "Update Course" : "Create Course"}

</button>


</form>


</div>


</div>



{/* COURSE TABLE */}



<div className="card border-0 shadow-lg rounded-4">


<div className="card-body p-4">


<h5 className="fw-semibold mb-3">

Your Courses

</h5>



<div className="table-responsive">


<table className="table align-middle">


<thead className="table-light">


<tr>

<th>Course</th>

<th>Status</th>

<th>Price</th>

<th width="180">Action</th>

</tr>


</thead>



<tbody>


{courses.length === 0 && (

<tr>

<td colSpan="4" className="text-center text-muted">

No Courses Found

</td>

</tr>

)}



{courses.map((c)=> (


<tr key={c.id}>


<td>

<div className="fw-semibold">

{c.title}

</div>

<div className="text-muted small">

{c.category}

</div>

</td>



<td>

<span className={`badge px-3 py-2 rounded-pill

${c.status==="APPROVED" ?

"bg-success-subtle text-success"

:

"bg-warning-subtle text-warning"

}`}>

{c.status}

</span>

</td>



<td className="fw-semibold">

₹{c.price}

</td>



<td>


<button

className="btn btn-outline-primary btn-sm me-2 rounded-pill"

onClick={()=>handleEdit(c)}

>

Edit

</button>



<button

className="btn btn-outline-danger btn-sm rounded-pill"

onClick={()=>handleDelete(c.id)}

>

Delete

</button>


</td>


</tr>


))}


</tbody>


</table>


</div>


</div>


</div>



</div>


);

}