import React, { useEffect, useState } from "react";

import {

addTutorMaterial,
getTutorMaterials,
getTutorCourses

} from "./authService";


export default function TutorMaterials() {


const [courses, setCourses] = useState([]);

const [materials, setMaterials] = useState([]);


const [form, setForm] = useState({

courseId:"",
title:"",
url:""

});



useEffect(()=>{

loadCourses();

},[]);



const loadCourses = async ()=>{

const data = await getTutorCourses();

setCourses(data);

};



const loadMaterials = async(courseId)=>{

if(!courseId) return;

const data = await getTutorMaterials(courseId);

setMaterials(data);

};



const handleSubmit = async(e)=>{

e.preventDefault();

await addTutorMaterial(

form.courseId,
form.title,
form.url

);

setForm({

...form,
title:"",
url:""

});

loadMaterials(form.courseId);

};



return (


<div className="container-fluid py-4 px-4">



{/* HEADER */}


<h2 className="fw-bold text-white">

 Course Materials

</h2>



{/* FORM CARD */}


<div className="card shadow-lg border-0 rounded-4 mb-5">


<div className="card-body p-4">


<h5 className="fw-semibold mb-3">

Add New Material

</h5>



<form onSubmit={handleSubmit}>


<div className="row g-3">



<div className="col-md-4">


<select

className="form-select form-select-lg"

value={form.courseId}

onChange={(e)=>{

setForm({...form,courseId:e.target.value});
loadMaterials(e.target.value);

}}

required

>

<option value="">

Select Course

</option>


{courses.map(c=>(

<option key={c.id} value={c.id}>

{c.title}

</option>

))}


</select>


</div>



<div className="col-md-4">


<input

className="form-control form-control-lg"

placeholder="Material Title"

value={form.title}

onChange={(e)=>setForm({...form,title:e.target.value})}

required

/>


</div>



<div className="col-md-4">


<input

className="form-control form-control-lg"

placeholder="Material URL"

value={form.url}

onChange={(e)=>setForm({...form,url:e.target.value})}

required

/>


</div>



</div>



<button className="btn btn-primary btn-lg mt-4 px-5 rounded-pill">

Add Material

</button>


</form>


</div>


</div>




{/* MATERIAL TABLE */}


<div className="card shadow-lg border-0 rounded-4">


<div className="card-body p-4">


<h5 className="fw-semibold mb-3">

Course Materials List

</h5>



<div className="table-responsive">


<table className="table align-middle">


<thead className="table-light">


<tr>

<th>Title</th>

<th>Link</th>

</tr>


</thead>


<tbody>


{materials.length===0 &&(

<tr>

<td colSpan="2" className="text-center text-muted">

No Materials Found

</td>

</tr>

)}



{materials.map(m=>(


<tr key={m.id}>


<td className="fw-semibold">

{m.title}

</td>



<td>


<a

href={m.url}

target="_blank"

rel="noreferrer"

className="btn btn-outline-primary btn-sm rounded-pill"

>

View Material

</a>


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