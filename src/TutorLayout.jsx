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


export default function TutorLayout(){

const navigate = useNavigate();

const [showSidebar,setShowSidebar] = useState(false);


const logout = ()=>{

localStorage.removeItem("token");

navigate("/login");

};


return(

<div className="admin-layout">


{/* MOBILE HEADER */}


<div className="mobile-header d-md-none">


<h5>Tutor Panel</h5>


<Menu

className="burger-icon"

onClick={()=>setShowSidebar(true)}

/>


</div>



{/* SIDEBAR */}


<div className={`admin-sidebar ${showSidebar ? "open" : ""}`}>



{/* CLOSE MOBILE */}


<div className="d-md-none text-end mb-3">

<X

className="close-icon"

onClick={()=>setShowSidebar(false)}

/>

</div>



<h4 className="text-info mb-4">

Tutor Panel

</h4>



<SidebarLink

to="/tutor"

icon={<LayoutDashboard size={18}/>}

text="Dashboard"

closeSidebar={()=>setShowSidebar(false)}

/>



<SidebarLink

to="/tutor/courses"

icon={<BookOpen size={18}/>}

text="Courses"

closeSidebar={()=>setShowSidebar(false)}

/>



<SidebarLink

to="/tutor/classes"

icon={<Video size={18}/>}

text="Live Classes"

closeSidebar={()=>setShowSidebar(false)}

/>



<SidebarLink

to="/tutor/materials"

icon={<FileText size={18}/>}

text="Materials"

closeSidebar={()=>setShowSidebar(false)}

/>



<button

onClick={logout}

className="btn btn-danger w-100 mt-auto"

>

<LogOut size={18}/> Logout

</button>


</div>



{/* OVERLAY */}


{showSidebar && (

<div

className="sidebar-overlay"

onClick={()=>setShowSidebar(false)}

/>

)}



{/* CONTENT */}


<div className="admin-content">

<Outlet/>

</div>


</div>

);

}



function SidebarLink({to,icon,text,closeSidebar}){

return(

<NavLink

to={to}

onClick={closeSidebar}

className={({isActive})=>

`sidebar-link-premium d-flex align-items-center gap-2

${isActive ? "active" : ""}`

}

>

{icon}

{text}

</NavLink>

);

}