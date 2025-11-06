import React from "react";
import { Mail, Phone, Github, MapPin } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-section text-light">
      <div className="container-fluid px-4">
        <h2 className="text-center fw-bold display-5 mb-4 contact-title">
          Contact <span>LearnMate</span>
        </h2>
        <p className="text-center mb-5 lead">
          We'd love to hear from you! Reach out via email, phone, or connect with us on GitHub.
        </p>

        <div className="row justify-content-center g-4">
          {/* Email */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card p-4 text-center shadow-lg">
              <Mail className="contact-icon mb-3" size={40} />
              <h5>Email</h5>
              <p>support@learnmate.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card p-4 text-center shadow-lg">
              <Phone className="contact-icon mb-3" size={40} />
              <h5>Phone</h5>
              <p>+91 98765 43210</p>
            </div>
          </div>

          {/* GitHub */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card p-4 text-center shadow-lg">
              <Github className="contact-icon mb-3" size={40} />
              <h5>GitHub</h5>
              <a
                href="https://github.com/learnmate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
              >
                github.com/learnmate
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card p-4 text-center shadow-lg">
              <MapPin className="contact-icon mb-3" size={40} />
              <h5>Location</h5>
              <p>New Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <h6>Quick Links</h6>
          <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
            <a href="/home" className="quick-link">Home</a>
            <a href="/about" className="quick-link">About</a>
            <a href="/features" className="quick-link">Features</a>
            <a href="/contact" className="quick-link">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
