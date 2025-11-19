import React, { useEffect } from "react";
import { Mail, Phone, Github } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

export default function Contact() {
  
  // 🔥 Hide Navbar
  useEffect(() => {
    document.body.classList.add("no-navbar");
    return () => document.body.classList.remove("no-navbar");
  }, []);

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
          <div className="col-md-6 col-lg-4">
            <div className="contact-card p-4 text-center shadow-lg equal-card">
              <Mail className="contact-icon mb-3" size={40} />
              <h5>Email</h5>
              <p>support@learnmate.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="col-md-6 col-lg-4">
            <div className="contact-card p-4 text-center shadow-lg equal-card">
              <Phone className="contact-icon mb-3" size={40} />
              <h5>Phone</h5>
              <p>+91 98765 43210</p>
            </div>
          </div>

          {/* GitHub */}
          <div className="col-md-6 col-lg-4">
            <div className="contact-card p-4 text-center shadow-lg equal-card">
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

        </div>
      </div>
    </section>
  );
}
