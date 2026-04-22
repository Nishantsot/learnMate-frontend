import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout(){

return(

<div className="d-flex">

<AdminSidebar/>

<div className="flex-grow-1 p-4 bg-light min-vh-100">

<Outlet/>

</div>

</div>

);

}