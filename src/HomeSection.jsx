import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeSection.css";

export default function HomeSection() {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
      title: "Welcome to LearnMate",
      desc: "Empowering learners to achieve their goals through smart, guided learning."
    },
    {
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
      title: "Interactive & Personalized",
      desc: "Experience AI-driven courses tailored just for you."
    },
    {
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
      title: "Learn Together, Grow Together",
      desc: "Join our community and share knowledge with peers globally."
    }
  ];

  return (
    <div className="home-section-wrapper">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="home-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img src={slide.img} alt={slide.title} className="slide-img" />
              <div className="overlay"></div>
              <div className="slide-text text-center text-light">
                <h1>{slide.title}</h1>
                <p>{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
