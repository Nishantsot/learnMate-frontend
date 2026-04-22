import React, { useState } from "react";
import {
  LayoutDashboard,
  UserCheck,
  LogOut,
  Menu,
  X
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ setActiveSection }) {

const [showSidebar,setShowSidebar] = useState(false);
const navigate = useNavigate();

const handleClick = (section)=>{
setActiveSection(section);
setShowSidebar(false);
};

return(

<>

{/* MOBILE HEADER */}

<div className="mobile-header d-md-none">

<h5 className="fw-bold text-info">Admin Panel</h5>

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


<h4 className="text-info fw-bold mb-4">

Admin Panel

</h4>


{/* DASHBOARD */}

<div
className="sidebar-link-premium d-flex align-items-center gap-2"
onClick={()=>handleClick("dashboard")}
>

<LayoutDashboard size={18}/>
Dashboard

</div>



{/* PENDING COURSES */}

<div
className="sidebar-link-premium d-flex align-items-center gap-2"
onClick={()=>handleClick("courses")}
>

<UserCheck size={18}/>
Pending Courses

</div>



{/* LOGOUT */}

<div
className="sidebar-link-premium text-danger d-flex align-items-center gap-2 mt-auto"
onClick={()=>{
localStorage.removeItem("token");
navigate("/login");
}}
>

<LogOut size={18}/>
Logout

</div>


</div>



{/* OVERLAY */}

{showSidebar && (

<div
className="sidebar-overlay"
onClick={()=>setShowSidebar(false)}
></div>

)}

</>

);

}