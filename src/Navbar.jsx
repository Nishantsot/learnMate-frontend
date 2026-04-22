import React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm custom-navbar">
      <div className="container-fluid px-4">

        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3 text-light" to="/">
          Learn<span className="text-accent">Mate</span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">

            {/* Home */}
          <li className="nav-item">
  <NavLink to="/home" className="btn btn-nav">
    Home
  </NavLink>
</li>
            {/* Slider */}
            

            {/* About */}
            <li className="nav-item">
              <NavLink to="/about" className="btn btn-nav">
                About
              </NavLink>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <NavLink to="/contact" className="btn btn-nav">
                Contact
              </NavLink>
            </li>

            {/* Login */}
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-main">
                Login
              </NavLink>
            </li>

            {/* Register */}
            <li className="nav-item">
              <NavLink to="/register" className="btn btn-outline-main">
                Register
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}