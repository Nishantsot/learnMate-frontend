import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      const section =
        document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate("/");

    setTimeout(() => {
      const section =
        document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm custom-navbar">
      <div className="container-fluid px-4">

        {/* Brand */}
        <button
          className="navbar-brand fw-bold fs-3 text-light border-0 bg-transparent"
          onClick={() =>
            scrollToSection("home")
          }
        >
          Learn
          <span className="text-accent">
            Mate
          </span>
        </button>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-2">

            {/* Home */}
            <li className="nav-item">
              <button
                className="btn btn-nav"
                onClick={() =>
                  scrollToSection("home")
                }
              >
                Home
              </button>
            </li>

            {/* About */}
            <li className="nav-item">
              <button
                className="btn btn-nav"
                onClick={() =>
                  scrollToSection("about")
                }
              >
                About
              </button>
            </li>

            {/* Features */}
            <li className="nav-item">
              <button
                className="btn btn-nav"
                onClick={() =>
                  scrollToSection("features")
                }
              >
                Features
              </button>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <button
                className="btn btn-nav"
                onClick={() =>
                  scrollToSection("contact")
                }
              >
                Contact
              </button>
            </li>

            {/* Login */}
            <li className="nav-item">
              <Link
                to="/login"
                className="btn btn-main"
              >
                Login
              </Link>
            </li>

            {/* Register */}
            <li className="nav-item">
              <Link
                to="/register"
                className="btn btn-outline-main"
              >
                Register
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}