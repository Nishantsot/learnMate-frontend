import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

import "./StudentDashboard.css";

export default function StudentLayout() {
  return (
    <div className="student-layout">

      <StudentSidebar />

      <main className="student-main-content">
        <Outlet />
      </main>

    </div>
  );
}