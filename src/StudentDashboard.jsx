import { useEffect,useState } from "react";

import { fetchStudentDashboard } from "./authService";

export default function StudentDashboard(){

const [data,setData]=useState({});

useEffect(()=>{

load();

},[]);


const load = async()=>{

const res = await fetchStudentDashboard();

setData(res);

};


return(

<div className="content-area">

<h3 className="mb-4">Dashboard</h3>

<div className="row g-3">

<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">

<div className="card shadow-sm h-100">

<div className="card-body text-center">

<h6 className="text-muted">Total Courses</h6>

<h2 className="fw-bold">{data.totalCourses || 0}</h2>

</div>

</div>

</div>


<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">

<div className="card shadow-sm h-100">

<div className="card-body text-center">

<h6 className="text-muted">My Courses</h6>

<h2 className="fw-bold">{data.myCourses || 0}</h2>

</div>

</div>

</div>


<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">

<div className="card shadow-sm h-100">

<div className="card-body text-center">

<h6 className="text-muted">Classes</h6>

<h2 className="fw-bold">{data.classes || 0}</h2>

</div>

</div>

</div>

</div>

</div>

);

}