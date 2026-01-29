import "../../style/Hero.css";
import { useState, useEffect } from "react";
import hero_bg_car from "../../assets/hero-bg-car.png";
import hero_bg_tracker from "../../assets/hero-bg-tracker.png";

const slides = [
  {
    id: 1,
    bg: ` ${hero_bg_car}`,
    title: "Quality Cars You Can Trust",
    subtitle: "Buy, swap, or finance your next car easily",
    textColor: "#151922",
    btnBg: "#16447E",
    btnColor: "#fff",
  },
  {
    id: 2,
    bg: ` ${hero_bg_tracker}`,
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
          <article className="wrapper" style={{ color: slide.textColor }}>
           <div  className="hero-title-holder">
           {/* just a container, no css applied */}
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
          </article>
        </div>
      ))}
    </div>
  );
};

export default Hero_section;
