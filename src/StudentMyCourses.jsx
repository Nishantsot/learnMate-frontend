import { useEffect, useState } from "react";
import { fetchMyCourses } from "./authService";

export default function StudentMyCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await fetchMyCourses();
      console.log("My Courses:", res);   // debug
      setCourses(res || []);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  return (

<div className="content-area">

<h3 className="mb-4">My Courses</h3>

{courses.length === 0 ? (

<p>No enrolled courses yet.</p>

) : (

<div className="row g-3">

{courses.map((c)=>{

const course = c.course || {};

return(

<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={c.id}>

<div className="card shadow-sm h-100">

<div className="card-body">

<h5 className="card-title">
{course.title || "Course"}
</h5>

<p className="text-muted">
{course.description || "No description"}
</p>

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