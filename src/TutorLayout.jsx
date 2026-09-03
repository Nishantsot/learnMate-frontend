import React, { useState } from "react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

import "./AdminDashboard.css";


export default function TutorLayout() {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] =
    useState(false);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    setShowSidebar(false);

    navigate("/login");
  };


  return (
    <div className="admin-layout">


      <div className="mobile-header d-md-none">

        <div className="mobile-admin-brand">

          <div className="mobile-admin-icon">
            <GraduationCap size={20} />
          </div>

          <span>
            LearnMate Tutor
          </span>

        </div>


        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() =>
            setShowSidebar(true)
          }
        >
          <Menu size={24} />
        </button>

      </div>


 

      <aside
        className={`admin-sidebar ${
          showSidebar ? "open" : ""
        }`}
      >

        {/* MOBILE CLOSE */}

        <div className="admin-sidebar-mobile-top d-md-none">

          <span>
            Tutor Menu
          </span>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() =>
              setShowSidebar(false)
            }
          >
            <X size={22} />
          </button>

        </div>


        {/* BRAND */}

        <div className="admin-sidebar-brand">

          <div className="admin-brand-icon">

            <GraduationCap size={25} />

          </div>


          <div>

            <h4>
              LearnMate
            </h4>

            <span>
              Tutor Panel
            </span>

          </div>

        </div>


     

        <nav className="admin-sidebar-nav">

          <SidebarLink
            to="/tutor"
            end
            icon={
              <LayoutDashboard size={19} />
            }
            text="Dashboard"
            closeSidebar={() =>
              setShowSidebar(false)
            }
          />


          <SidebarLink
            to="/tutor/courses"
            icon={
              <BookOpen size={19} />
            }
            text="Courses"
            closeSidebar={() =>
              setShowSidebar(false)
            }
          />


          <SidebarLink
            to="/tutor/classes"
            icon={
              <Video size={19} />
            }
            text="Live Classes"
            closeSidebar={() =>
              setShowSidebar(false)
            }
          />


          <SidebarLink
            to="/tutor/materials"
            icon={
              <FileText size={19} />
            }
            text="Materials"
            closeSidebar={() =>
              setShowSidebar(false)
            }
          />

        </nav>


   

        <div className="admin-sidebar-bottom">

          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={logout}
          >

            <LogOut size={18} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      

      {showSidebar && (

        <div
          className="sidebar-overlay"
          onClick={() =>
            setShowSidebar(false)
          }
        />

      )}


  
      <main className="admin-content">

        <Outlet />

      </main>

    </div>
  );
}




function SidebarLink({
  to,
  icon,
  text,
  closeSidebar,
  end = false,
}) {
  return (

    <NavLink
      to={to}
      end={end}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `sidebar-link-premium ${
          isActive ? "active" : ""
        }`
      }
    >

      <div className="sidebar-menu-icon">
        {icon}
      </div>

      <span>
        {text}
      </span>

    </NavLink>

  );
}