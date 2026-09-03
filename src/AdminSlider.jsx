import React, {
  useState,
} from "react";

import {
  LayoutDashboard,
  BookOpenCheck,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";


export default function AdminSidebar({
  activeSection,
  setActiveSection,
}) {

  const [
    showSidebar,
    setShowSidebar,
  ] = useState(false);

  const navigate =
    useNavigate();


  const handleClick = (
    section
  ) => {

    setActiveSection(
      section
    );

    setShowSidebar(
      false
    );
  };


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
      {/* =========================
          MOBILE HEADER
      ========================== */}

      <div className="mobile-header d-md-none">

        <div className="mobile-admin-brand">

          <div className="mobile-admin-icon">

            <ShieldCheck
              size={20}
            />

          </div>

          <span>
            LearnMate Admin
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
            Admin Menu
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

            <ShieldCheck
              size={25}
            />

          </div>


          <div>

            <h4>
              LearnMate
            </h4>

            <span>
              Admin Panel
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="admin-sidebar-nav">

          <button
            type="button"

            className={`sidebar-link-premium ${
              activeSection ===
              "dashboard"
                ? "active"
                : ""
            }`}

            onClick={() =>
              handleClick(
                "dashboard"
              )
            }
          >

            <div className="sidebar-menu-icon">

              <LayoutDashboard
                size={19}
              />

            </div>

            <span>
              Dashboard
            </span>

          </button>


          <button
            type="button"

            className={`sidebar-link-premium ${
              activeSection ===
              "courses"
                ? "active"
                : ""
            }`}

            onClick={() =>
              handleClick(
                "courses"
              )
            }
          >

            <div className="sidebar-menu-icon">

              <BookOpenCheck
                size={19}
              />

            </div>

            <span>
              Pending Courses
            </span>

          </button>

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