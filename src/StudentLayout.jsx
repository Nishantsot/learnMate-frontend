import StudentSidebar from "./StudentSidebar";
import { Outlet } from "react-router-dom";

export default function StudentLayout(){

return(

<div className="d-flex">

<StudentSidebar/>

<div className="flex-grow-1 p-4 bg-light min-vh-100">

<Outlet />

</div>

</div>

);

}