import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";

export default function About() {
  const aboutCards = [
    {
      title: "What is LearnMate?",
      text: "LearnMate is your personal learning assistant — designed to help you organize, track, and improve your learning experience effortlessly.",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Our Mission",
      text: "We aim to empower learners with smart tools and personalized insights that make every learning journey efficient and enjoyable.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Smart Progress Tracking",
      text: "Get detailed analytics on your learning progress, stay motivated, and achieve milestones faster with AI-driven recommendations.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    },
    
  ];

  return (
    <section className="about-section text-light py-5">
      <div className="about-header text-center mb-5">
        <h2 className="fw-bold display-5 mb-3 text-gradient">About LearnMate</h2>
        <p className="lead text-light opacity-75">
          Discover how LearnMate helps you study smarter and grow faster 🚀
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        className="about-swiper"
      >
        {aboutCards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="card about-card text-dark border-0 shadow-lg">
              <img src={card.img} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">{card.title}</h5>
                <p className="card-text text-secondary">{card.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
