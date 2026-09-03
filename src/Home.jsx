import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  Github,
  BookOpen,
  Video,
  Bot,
  Users,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

export default function Home() {


  useEffect(() => {
    const elements =
      document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });

      observer.disconnect();
    };
  }, []);

  

  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
      title: "Learn Smarter With LearnMate",
      desc: "Courses, live classes, study materials and AI-powered learning in one platform.",
    },

    {
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
      title: "Interactive & Personalized Learning",
      desc: "Build your skills with tutors, smart learning tools and your personal AI Tutor.",
    },

    {
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
      title: "Learn Together. Grow Together.",
      desc: "Connect students and tutors through an intelligent modern learning experience.",
    },
  ];



  const aboutCards = [
    {
      title: "What is LearnMate?",
      text: "LearnMate is a modern learning platform where students can explore courses, attend classes, access materials and learn with AI.",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    },

    {
      title: "Our Mission",
      text: "Our mission is to make learning easier, smarter and more accessible through tutors, technology and artificial intelligence.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },

    {
      title: "AI Powered Learning",
      text: "Students can ask LearnMate AI questions across programming, science, mathematics, English and many other educational topics.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    },

    {
      title: "Live Learning",
      text: "Tutors can schedule interactive live classes while students can easily access upcoming sessions from their dashboard.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    },
  ];



  const features = [
    {
      icon: <BookOpen size={30} />,
      title: "Online Courses",
      text: "Browse and enroll in approved courses from experienced tutors.",
    },

    {
      icon: <Video size={30} />,
      title: "Live Classes",
      text: "Attend scheduled interactive learning sessions directly from LearnMate.",
    },

    {
      icon: <Bot size={30} />,
      title: "AI Tutor",
      text: "Ask questions on almost any educational topic and receive clear explanations.",
    },

    {
      icon: <GraduationCap size={30} />,
      title: "Study Materials",
      text: "Access useful course resources and learning materials shared by tutors.",
    },

    {
      icon: <ShieldCheck size={30} />,
      title: "Secure Access",
      text: "JWT authentication and role-based authorization for students, tutors and admins.",
    },

    {
      icon: <BarChart3 size={30} />,
      title: "Smart Dashboard",
      text: "Track courses, upcoming classes, students, tutors and platform activity.",
    },
  ];

 

  const contactData = [
    {
      icon: <Mail size={34} />,
      title: "Email",
      value: "support@learnmate.com",
      link: "mailto:support@learnmate.com",
    },

    {
      icon: <Phone size={34} />,
      title: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
    },

    {
      icon: <Github size={34} />,
      title: "GitHub",
      value: "Visit LearnMate GitHub",
      link: "https://github.com/",
    },
  ];

  return (
    <div className="learnmate-page">

   

      <section
        id="home"
        className="hero-section"
      >
        <Swiper
          modules={[
            Autoplay,
            Pagination,
            EffectFade,
          ]}
          slidesPerView={1}
          effect="fade"
          loop={true}
          speed={1200}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="hero-slide">

                <img
                  src={slide.img}
                  alt={slide.title}
                  className="hero-image"
                />

                <div className="hero-overlay" />

                <div className="particles">
                  {Array.from({
                    length: 24,
                  }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        "--i": i,
                      }}
                    />
                  ))}
                </div>

                <div className="hero-content">

                  <div className="hero-badge">
                    <Bot size={17} />

                    AI Powered Learning
                  </div>

                  <h1>
                    {slide.title}
                  </h1>

                  <p>
                    {slide.desc}
                  </p>

                  <div className="hero-actions">

                    <Link
                      to="/register"
                      className="hero-primary-btn"
                    >
                      Get Started

                      <ArrowRight size={19} />
                    </Link>

                    <a
                      href="#features"
                      className="hero-secondary-btn"
                    >
                      Explore Features
                    </a>

                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      

      <section
        id="about"
        className="section-block about-section"
      >
        <div className="section-glow glow-one" />

        <div className="container position-relative">

          <div className="section-heading reveal reveal-up">

            <span>
              ABOUT LEARNMATE
            </span>

            <h2>
              Learning Built For The Future
            </h2>

            <p>
              LearnMate combines courses,
              tutors, live learning and AI
              to create a smarter educational
              experience.
            </p>

          </div>

          <div className="reveal reveal-scale mt-5">

            <Swiper
              modules={[
                Autoplay,
                Pagination,
              ]}
              spaceBetween={25}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },

                1200: {
                  slidesPerView: 3,
                },
              }}
              className="about-swiper"
            >
              {aboutCards.map(
                (card, index) => (
                  <SwiperSlide key={index}>

                    <div className="about-card">

                      <div className="about-image-box">

                        <img
                          src={card.img}
                          alt={card.title}
                        />

                        <div className="image-gradient" />

                      </div>

                      <div className="about-card-body">

                        <h4>
                          {card.title}
                        </h4>

                        <p>
                          {card.text}
                        </p>

                      </div>

                    </div>

                  </SwiperSlide>
                )
              )}
            </Swiper>

          </div>
        </div>
      </section>

    

      <section
        id="features"
        className="section-block features-section"
      >
        <div className="section-glow glow-two" />

        <div className="container position-relative">

          <div className="section-heading reveal reveal-up">

            <span>
              FEATURES
            </span>

            <h2>
              Everything You Need To Learn
            </h2>

            <p>
              One powerful platform designed
              for students, tutors and
              administrators.
            </p>

          </div>

          <div className="row g-4 mt-4">

            {features.map(
              (feature, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 reveal reveal-up"
                  style={{
                    transitionDelay:
                      `${index * 80}ms`,
                  }}
                >

                  <div className="feature-card">

                    <div className="feature-icon">
                      {feature.icon}
                    </div>

                    <h4>
                      {feature.title}
                    </h4>

                    <p>
                      {feature.text}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      </section>

    

      <section className="ai-highlight-section">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6 reveal reveal-left">

              <div className="ai-big-icon">
                <Bot size={70} />
              </div>

            </div>

            <div className="col-lg-6 reveal reveal-right">

              <span className="small-label">
                LEARNMATE AI
              </span>

              <h2>
                Your Personal AI Tutor
              </h2>

              <p>
                Ask questions about programming,
                mathematics, science, English,
                history, economics and almost any
                educational topic.
              </p>

              <ul className="ai-list">

                <li>
                  ✓ Simple explanations
                </li>

                <li>
                  ✓ Step-by-step learning
                </li>

                <li>
                  ✓ Programming examples
                </li>

                <li>
                  ✓ Study assistance
                </li>

              </ul>

              <Link
                to="/register"
                className="ai-button"
              >
                Start Learning

                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>
      </section>

 

      <section className="cta-section">

        <div className="cta-orb orb-one" />
        <div className="cta-orb orb-two" />

        <div className="container position-relative">

          <div className="cta-content reveal reveal-scale">

            <Users size={42} />

            <h2>
              Start Your Learning Journey
              Today
            </h2>

            <p>
              Join LearnMate and experience
              modern, interactive and AI-powered
              education.
            </p>

            <Link
              to="/register"
              className="cta-button"
            >
              Create Your Account

              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </section>

   

<section id="contact" className="footer-wrapper-section">

  <div className="container">

    <div className="footer-mega-card reveal reveal-up">

     

      <div className="footer-top-area">

        <div className="footer-top-overlay" />

        <div className="footer-top-content">

          <span className="footer-small-label">
            CONTACT LEARNMATE
          </span>

          <h2>
            Learn Smarter. Grow Faster.
          </h2>

          <p>
            Have questions about courses, live classes,
            study materials or LearnMate AI?
            We're here to help.
          </p>


          {/* CONTACT ITEMS */}

          <div className="footer-contact-row">

            {contactData.map((item, index) => (

              <a
                key={index}
                href={item.link}
                target={
                  item.title === "GitHub"
                    ? "_blank"
                    : undefined
                }
                rel={
                  item.title === "GitHub"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="footer-contact-item"
              >

                <div className="footer-contact-icon">
                  {item.icon}
                </div>

                <div className="footer-contact-info">

                  <small>
                    {item.title}
                  </small>

                  <span>
                    {item.value}
                  </span>

                </div>

              </a>

            ))}

          </div>

        </div>

      </div>


      {/* ================================
          MAIN FOOTER
      ================================= */}

      <div className="footer-main-area">

        <div className="row g-4">

          {/* BRAND */}

          <div className="col-lg-4 col-md-6">

            <div className="footer-brand">
              🎓 Learn<span>Mate</span>
            </div>

            <p className="footer-about-text">
              LearnMate is a modern AI-powered learning
              platform connecting students and tutors
              through courses, live classes, study
              materials and intelligent learning tools.
            </p>

          </div>


          {/* QUICK LINKS */}

          <div className="col-lg-2 col-md-6">

            <h5 className="footer-heading">
              Quick Links
            </h5>

            <div className="footer-menu">

              <a href="#home">
                Home
              </a>

              <a href="#about">
                About
              </a>

              <a href="#features">
                Features
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

          </div>


          {/* PLATFORM */}

          <div className="col-lg-3 col-md-6">

            <h5 className="footer-heading">
              Platform
            </h5>

            <div className="footer-menu">

              <Link to="/register">
                Browse Courses
              </Link>

              <Link to="/register">
                Live Classes
              </Link>

              <Link to="/register">
                AI Tutor
              </Link>

              <Link to="/register">
                Study Materials
              </Link>

            </div>

          </div>


          {/* ACCOUNT */}

          <div className="col-lg-3 col-md-6">

            <h5 className="footer-heading">
              Account
            </h5>

            <div className="footer-menu">

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>

              <a href="#contact">
                Support
              </a>

              <a href="#features">
                Platform Features
              </a>

            </div>

          </div>

        </div>


        {/* ================================
            DIVIDER
        ================================= */}

        <div className="footer-divider" />


        {/* ================================
            COPYRIGHT
        ================================= */}

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} LearnMate.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="#home">
              Privacy
            </a>

            <a href="#home">
              Terms
            </a>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}