import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend,
} from "chart.js";

import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSlider";

ChartJS.register(
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
);

export default function AdminDashboard(){

const navigate = useNavigate();

const [stats,setStats] = useState({});
const [courses,setCourses] = useState([]);
const [activeSection,setActiveSection] = useState("dashboard");


/* AUTH CHECK */

useEffect(()=>{

const token = localStorage.getItem("token");

if(!token){
navigate("/login");
return;
}

try{

const payload = JSON.parse(atob(token.split(".")[1]));

if(payload.role !== "ADMIN"){
navigate("/login");
return;
}

loadData(token);

}
catch{
navigate("/login");
}

},[]);


/* LOAD DATA */

const loadData = async(token)=>{

try{

const api = axios.create({
baseURL:"http://localhost:8080",
headers:{ Authorization:`Bearer ${token}` }
});

const statsRes = await api.get("/admin/dashboard");
const courseRes = await api.get("/admin/courses/pending");

setStats(statsRes.data);
setCourses(courseRes.data);

}catch{
alert("Failed to load");
}

};


/* APPROVE */

const approveCourse = async(id)=>{

const token = localStorage.getItem("token");

await axios.put(
`http://localhost:8080/admin/course/approve/${id}`,
{},
{ headers:{ Authorization:`Bearer ${token}`} }
);

loadData(token);

};


/* REJECT */

const rejectCourse = async(id)=>{

const token = localStorage.getItem("token");

await axios.put(
`http://localhost:8080/admin/course/reject/${id}`,
{},
{ headers:{ Authorization:`Bearer ${token}`} }
);

loadData(token);

};


/* CHART */

const chartData = {

labels:["Users","Tutors","Students","Courses"],

datasets:[{
label:"Stats",
data:[
stats.totalUsers || 0,
stats.tutors || 0,
stats.students || 0,
stats.approvedCourses || 0
],
backgroundColor:[
"#0d6efd",
"#198754",
"#ffc107",
"#6f42c1"
]
}]

};


/* UI */

return(

<div className="admin-layout">

<AdminSidebar setActiveSection={setActiveSection}/>

<div className="admin-content">


{/* DASHBOARD */}

{activeSection === "dashboard" && (

<>

<h2 className="mb-4">Dashboard</h2>

<div className="row g-3">

<Card title="Users" value={stats.totalUsers}/>
<Card title="Tutors" value={stats.tutors}/>
<Card title="Students" value={stats.students}/>
<Card title="Courses" value={stats.approvedCourses}/>

</div>

<div className="card shadow mt-4 p-3">

<Bar data={chartData}/>

</div>

</>

)}



{/* COURSES */}

{activeSection === "courses" && (

<>

<h2 className="mb-3">Pending Courses</h2>

<div className="table-responsive">

<table className="table table-dark">

<thead>
<tr>
<th>ID</th>
<th>Title</th>
<th>Category</th>
<th>Price</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{courses.map(c=>(

<tr key={c.id}>

<td>{c.id}</td>
<td>{c.title}</td>
<td>{c.category}</td>
<td>{c.price}</td>

<td>

<button
className="btn btn-success btn-sm me-2"
onClick={()=>approveCourse(c.id)}
>
Approve
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>rejectCourse(c.id)}
>
Reject
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</>

)}

</div>

</div>

);

}



/* CARD */

function Card({title,value}){

return(

<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">

<div className="card shadow-sm text-center h-100">

<div className="card-body">

<h6 className="text-muted">{title}</h6>

<h3 className="fw-bold">{value || 0}</h3>

</div>

</div>

</div>

);

}