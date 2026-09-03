import React, {
  useState,
} from "react";

import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Video,
  Bot,
  LogOut,
  Menu,
  X,
  UserRound,
} from "lucide-react";

import {
  useNavigate,
  NavLink,
} from "react-router-dom";


export default function StudentSidebar() {

  const [
    showSidebar,
    setShowSidebar,
  ] = useState(false);

  const navigate =
    useNavigate();


  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "userName"
    );

    navigate(
      "/login"
    );
  };


  return (
    <>


      <div className="mobile-header d-md-none">

        <div className="mobile-admin-brand">

          <div className="mobile-admin-icon">

            <UserRound
              size={20}
            />

          </div>

          <span>
            LearnMate Student
          </span>

        </div>


        <button
          type="button"
          className="mobile-menu-btn"

          onClick={() =>
            setShowSidebar(
              true
            )
          }
        >

          <Menu size={24} />

        </button>

      </div>


     

      <aside
        className={`admin-sidebar ${
          showSidebar
            ? "open"
            : ""
        }`}
      >

        {/* MOBILE CLOSE */}

        <div className="admin-sidebar-mobile-top d-md-none">

          <span>
            Student Menu
          </span>

          <button
            type="button"
            className="sidebar-close-btn"

            onClick={() =>
              setShowSidebar(
                false
              )
            }
          >

            <X size={22} />

          </button>

        </div>


        {/* BRAND */}

        <div className="admin-sidebar-brand">

          <div className="admin-brand-icon">

            <UserRound
              size={25}
            />

          </div>


          <div>

            <h4>
              LearnMate
            </h4>

            <span>
              Student Panel
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="admin-sidebar-nav">


          <SidebarLink
            to="/student"
            end
            icon={
              <LayoutDashboard
                size={19}
              />
            }
            text="Dashboard"
            close={() =>
              setShowSidebar(
                false
              )
            }
          />


          <SidebarLink
            to="/student/courses"
            icon={
              <BookOpen
                size={19}
              />
            }
            text="Browse Courses"
            close={() =>
              setShowSidebar(
                false
              )
            }
          />


          <SidebarLink
            to="/student/my-courses"
            icon={
              <GraduationCap
                size={19}
              />
            }
            text="My Courses"
            close={() =>
              setShowSidebar(
                false
              )
            }
          />


          <SidebarLink
            to="/student/classes"
            icon={
              <Video
                size={19}
              />
            }
            text="Live Classes"
            close={() =>
              setShowSidebar(
                false
              )
            }
          />


          <SidebarLink
            to="/student/ai-tutor"
            icon={
              <Bot
                size={19}
              />
            }
            text="AI Tutor"
            close={() =>
              setShowSidebar(
                false
              )
            }
          />


        </nav>


        {/* LOGOUT */}

        <div className="admin-sidebar-bottom">

          <button
            type="button"
            className="sidebar-logout-btn"

            onClick={
              logout
            }
          >

            <LogOut
              size={18}
            />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* OVERLAY */}

      {showSidebar && (

        <div
          className="sidebar-overlay"

          onClick={() =>
            setShowSidebar(
              false
            )
          }
        />

      )}

    </>
  );
}





function SidebarLink({
  to,
  icon,
  text,
  close,
  end = false,
}) {

  return (

    <NavLink
      to={to}

      end={end}

      onClick={close}

      className={({
        isActive,
      }) =>
        `sidebar-link-premium ${
          isActive
            ? "active"
            : ""
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