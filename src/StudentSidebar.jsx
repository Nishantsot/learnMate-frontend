import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Video,
  Bot,
  LogOut,
} from "lucide-react";

export default function StudentSidebar() {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="mobile-header d-md-none">
        <h5>🎓 Student Panel</h5>

        <Menu
          className="burger-icon"
          onClick={() => setShowSidebar(true)}
        />
      </div>

      {/* SIDEBAR */}
      <div
        className={`admin-sidebar ${
          showSidebar ? "open" : ""
        }`}
      >
        {/* CLOSE BUTTON */}
        <div className="d-md-none text-end mb-3">
          <X
            className="close-icon"
            onClick={() => setShowSidebar(false)}
          />
        </div>

        <h4 className="text-info mb-4">
          🎓 Student Panel
        </h4>

        <SidebarLink
          to="/student"
          text="Dashboard"
          icon={<LayoutDashboard size={19} />}
          close={() => setShowSidebar(false)}
        />

        <SidebarLink
          to="/student/courses"
          text="Browse Courses"
          icon={<BookOpen size={19} />}
          close={() => setShowSidebar(false)}
        />

        <SidebarLink
          to="/student/my-courses"
          text="My Courses"
          icon={<GraduationCap size={19} />}
          close={() => setShowSidebar(false)}
        />

        <SidebarLink
          to="/student/classes"
          text="Live Classes"
          icon={<Video size={19} />}
          close={() => setShowSidebar(false)}
        />

        {/* AI TUTOR */}
        <SidebarLink
          to="/student/ai-tutor"
          text="AI Tutor"
          icon={<Bot size={19} />}
          close={() => setShowSidebar(false)}
        />

        <button
          className="btn btn-danger mt-auto d-flex align-items-center justify-content-center gap-2"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* OVERLAY */}
      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
}

function SidebarLink({
  to,
  text,
  icon,
  close,
}) {
  return (
    <NavLink
      to={to}
      end={to === "/student"}
      onClick={close}
      className={({ isActive }) =>
        `sidebar-link-premium d-flex align-items-center gap-2 p-2 rounded mb-2 ${
          isActive ? "active" : ""
        }`
      }
    >
      {icon}

      <span>{text}</span>
    </NavLink>
  );
}