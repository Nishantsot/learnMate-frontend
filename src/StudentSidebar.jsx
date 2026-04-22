import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function StudentSidebar(){

const navigate = useNavigate();

const [showSidebar,setShowSidebar] = useState(false);

const logout = () => {

localStorage.removeItem("token");

navigate("/login");

};

return(

<>


{/* MOBILE HEADER */}

<div className="mobile-header d-md-none">

<h5>🎓 Student Panel</h5>

<Menu
className="burger-icon"
onClick={()=>setShowSidebar(true)}
/>

</div>



{/* SIDEBAR */}

<div className={`admin-sidebar ${showSidebar ? "open" : ""}`}>


{/* CLOSE BUTTON */}

<div className="d-md-none text-end mb-3">

<X
className="close-icon"
onClick={()=>setShowSidebar(false)}
/>

</div>


<h4 className="text-info mb-4">

🎓 Student Panel

</h4>


<SidebarLink
to="/student"
text="Dashboard"
close={()=>setShowSidebar(false)}
/>


<SidebarLink
to="/student/courses"
text="Browse Courses"
close={()=>setShowSidebar(false)}
/>


<SidebarLink
to="/student/my-courses"
text="My Courses"
close={()=>setShowSidebar(false)}
/>


<SidebarLink
to="/student/classes"
text="Live Classes"
close={()=>setShowSidebar(false)}
/>


<button
className="btn btn-danger mt-auto"
onClick={logout}
>

Logout

</button>


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



function SidebarLink({to,text,close}){

return(

<NavLink

to={to}

onClick={close}

className={({isActive})=>

`sidebar-link-premium d-block p-2 rounded mb-2

${isActive ? "active" : ""}`

}

>

{text}

</NavLink>

);

}