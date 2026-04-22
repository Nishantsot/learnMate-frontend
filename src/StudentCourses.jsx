import { useEffect,useState } from "react";
import { fetchAllCourses,enrollCourse } from "./authService";

export default function StudentCourses(){

const [courses,setCourses]=useState([]);

useEffect(()=>{
load();
},[]);

const load = async()=>{

const res = await fetchAllCourses();

setCourses(res || []);

};

const enroll = async(id)=>{

await enrollCourse(id);

alert("Enrolled");

};

return(

<div className="content-area">

<h3 className="mb-4">Browse Courses</h3>

<div className="row g-3">

{courses.map(c=>(

<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={c.id}>

<div className="card shadow-sm h-100">

<div className="card-body d-flex flex-column">

<h5>{c.title}</h5>

<p className="text-muted flex-grow-1">
{c.description}
</p>

<h6 className="mb-3">₹{c.price}</h6>

<button
className="btn btn-primary w-100"
onClick={()=>enroll(c.id)}
>

Enroll

</button>

</div>

</div>

</div>

))}

</div>

</div>

);

}