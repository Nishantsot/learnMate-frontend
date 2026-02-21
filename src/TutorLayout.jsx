import React, { useState } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {

LayoutDashboard,
BookOpen,
Video,
FileText,
LogOut,
Menu,
X

} from "lucide-react";


export default function TutorLayout() {


const navigate = useNavigate();

const [showSidebar, setShowSidebar] = useState(false);



const logout = ()=>{

localStorage.removeItem("token");

navigate("/login");

};



return (


<div className="d-flex min-vh-100 tutor-bg">



{/* MOBILE HEADER */}


<div className="d-md-none p-3 bg-dark text-white d-flex justify-content-between align-items-center w-100">


<h5 className="mb-0">

Tutor Panel

</h5>


<Menu

style={{cursor:"pointer"}}

onClick={()=>setShowSidebar(true)}

/>


</div>



{/* SIDEBAR */}


<div

className={`sidebar-premium text-white p-4

${showSidebar?"show-sidebar":""}

`}

>


{/* CLOSE BUTTON MOBILE */}


<div className="d-md-none text-end mb-3">


<X

style={{cursor:"pointer"}}

onClick={()=>setShowSidebar(false)}

/>


</div>



<h4 className="mb-4 text-info">

Tutor Panel

</h4>



<SidebarLink

to="/tutor"

icon={<LayoutDashboard size={18}/>}

text="Dashboard"

/>



<SidebarLink

to="/tutor/courses"

icon={<BookOpen size={18}/>}

text="Courses"

/>



<SidebarLink

to="/tutor/classes"

icon={<Video size={18}/>}

text="Live Classes"

/>



<SidebarLink

to="/tutor/materials"

icon={<FileText size={18}/>}

text="Materials"

/>



<button

onClick={logout}

className="btn btn-danger mt-5 w-100 rounded-pill"

>

<LogOut size={18}/> Logout

</button>


</div>



{/* MAIN CONTENT */}



<div className="flex-grow-1 p-4 content-area">


<Outlet/>


</div>



</div>


);

}




function SidebarLink({to,icon,text}){


return(


<NavLink

to={to}

className={({isActive})=>

`d-flex align-items-center gap-2 p-3 mb-2 rounded sidebar-link

${isActive?"active-premium":""}

`

}

>


{icon}

{text}


</NavLink>


);

}