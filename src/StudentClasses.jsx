import { useEffect, useState } from "react";
import { fetchMyClasses } from "./authService";

export default function StudentClasses(){

const [classes,setClasses] = useState([]);

useEffect(()=>{
load();
},[]);

const load = async () => {
  try {

    const res = await fetchMyClasses();

    console.log("Student Classes:", res);

    setClasses(res ?? []);

  } catch (err) {

    console.error("Error loading classes:", err);
    setClasses([]);

  }
};

return(

<div className="content-area">

<h3 className="mb-4">Live Classes</h3>

{classes.length === 0 ? (

<p>No scheduled classes available.</p>

) : (

<div className="row g-3">

{classes.map(c=>(

<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={c.id}>

<div className="card shadow-sm h-100">

<div className="card-body">

<h5>
{c.course?.title || "Course"}
</h5>

<p className="text-muted">
Start: {new Date(c.startTime).toLocaleString()}
</p>

<p className="text-muted">
End: {new Date(c.endTime).toLocaleString()}
</p>

<p>Status: {c.status}</p>

<a
href={`/tutor/live/${c.roomId}`}
className="btn btn-success"
>
Join Class
</a>

</div>

</div>

</div>

))}

</div>

)}

</div>

);

}