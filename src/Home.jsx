import React, { useState, useEffect } from "react";
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
    let timeout;

    const type = () => {
      if (index < slogans[currentSlogan].length) {
        setDisplayText((prev) => prev + slogans[currentSlogan].charAt(index));
        index++;
        timeout = setTimeout(type, 80);
      } else {
        setTimeout(() => deleteText(), 2000);
      }
    };

    const deleteText = () => {
      if (index > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        index--;
        timeout = setTimeout(deleteText, 40);
      } else {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [currentSlogan]);

  return (
    <section
      id="home"
      className="home-section d-flex align-items-center justify-content-center text-center text-light"
    >
      <div className="container-fluid">
        <div className="content-box">
          <h1 className="display-2 fw-bold mb-3">LearnMate</h1>
          <h4 className="slogan-text">
            <span className="typing">{displayText}</span>
            <span className="cursor">|</span>
          </h4>

          <div className="mt-4">
            <a href="/register" className="btn btn-lg btn-light text-primary px-5 py-2 fw-semibold shadow-sm">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
