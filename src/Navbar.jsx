import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // custom style file

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm custom-navbar">
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3 text-light" to="/">
          Learn<span className="text-accent">Mate</span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item ms-3">
              <Link className="btn btn-light text-primary px-4 fw-semibold shadow-sm" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link className="btn btn-outline-light px-4 fw-semibold" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
