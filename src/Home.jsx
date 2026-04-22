import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  const slogans = [
    "Learn Smarter, Not Harder 💡",
    "Track Your Progress Effortlessly 📊",
    "Grow Your Skills with LearnMate 🚀",
    "Your Smart Learning Companion 🎓",
  ];

  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    let typingTimeout;
    let deletingTimeout;

    const type = () => {
      if (index < slogans[currentSlogan].length) {
        setDisplayText(slogans[currentSlogan].slice(0, index + 1));
        index++;
        typingTimeout = setTimeout(type, 80);
      } else {
        deletingTimeout = setTimeout(deleteText, 2000);
      }
    };

    const deleteText = () => {
      if (index > 0) {
        setDisplayText(slogans[currentSlogan].slice(0, index - 1));
        index--;
        deletingTimeout = setTimeout(deleteText, 40);
      } else {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
      }
    };

    type();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(deletingTimeout);
    };
  }, [currentSlogan]);

  return (
    <section id="home" className="home-section text-light">
      
      <div className="floating-bg"></div>

      {/* Particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
      </div>

      <div className="content-box text-center">
        <h1 className="hero-title">LearnMate</h1>

        <h4 className="slogan-text">
          <span className="typing">{displayText}</span>
          <span className="cursor">|</span>
        </h4>

        {/* ✅ FIXED navigation */}
        <Link
          to="/register"
          className="btn btn-lg btn-start shadow-lg fw-semibold"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Home;