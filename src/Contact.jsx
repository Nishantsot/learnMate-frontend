import React, { useEffect } from "react";
import { Mail, Phone, Github } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

export default function Contact() {

  useEffect(() => {
    document.body.classList.add("no-navbar");
    return () => document.body.classList.remove("no-navbar");
  }, []);

  const contactData = [
    {
      icon: <Mail size={40} />,
      title: "Email",
      value: "support@learnmate.com",
      link: "mailto:support@learnmate.com"
    },
    {
      icon: <Phone size={40} />,
      title: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: <Github size={40} />,
      title: "GitHub",
      value: "github.com/learnmate",
      link: "https://github.com/learnmate"
    }
  ];

  return (
    <section className="contact-section text-light d-flex align-items-center">

      {/* ✅ SAME background as Home */}
      <div className="floating-bg"></div>

      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
      </div>

      <div className="container position-relative">
        
        <h2 className="text-center fw-bold display-5 mb-3 contact-title">
          Contact <span>LearnMate</span>
        </h2>

        <p className="text-center mb-5 lead">
          We'd love to hear from you! Reach out anytime.
        </p>

        <div className="row justify-content-center g-4">
          {contactData.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4 d-flex">
              <div className="contact-card p-4 text-center shadow-lg w-100">

                <div className="contact-icon mb-3">
                  {item.icon}
                </div>

                <h5>{item.title}</h5>

                <a
                  href={item.link}
                  target={item.title === "GitHub" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none contact-link"
                >
                  {item.value}
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}