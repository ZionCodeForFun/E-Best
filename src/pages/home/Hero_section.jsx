import "../../style/Hero.css";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    bg: "/src/assets/hero-bg-car.png",
    title: "Quality Cars You Can Trust",
    subtitle: "Buy, swap, or finance your next car easily",
    textColor: "#151922",
    btnBg: "#16447E",
    btnColor: "#fff",
  },
  {
    id: 2,
    bg: "/src/assets/hero-bg-tracker.png",
    title: "Track & Secure Your Vehicle",
    subtitle: "Real-time GPS tracking with professional installation",
    textColor: "#fff",
    btnBg: "#D31716",
    btnColor: "#fff",
  },
];

const Hero_section = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.bg})` }}
        >
          <div className="wrapper" style={{ color: slide.textColor }}>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <button
              className="cta-btn"
              style={{
                backgroundColor: slide.btnBg,
                color: slide.btnColor,
              }}
            >
              Explore Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero_section;
