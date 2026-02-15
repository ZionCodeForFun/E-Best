


import { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../style/Hero.css'
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1705747401901-28363172fe7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NzExMTYyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Find Your Perfect Car',
    subtitle: 'Quality vehicles at unbeatable prices',
  },
  {
    image: 'https://images.unsplash.com/photo-1634743556192-d19f0c69ff3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjB2ZWhpY2xlJTIwdHJhY2tlciUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzExNzUyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Advanced Vehicle Tracking',
    subtitle: 'Secure your car with smart GPS solutions',
  },
  {
    image: 'https://images.unsplash.com/photo-1760836395840-fdfebd413333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhY2Nlc3NvcmllcyUyMHJpbXN8ZW58MXx8fHwxNzcxMTc1MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Upgrade Your Ride',
    subtitle: 'Premium car accessories for style and comfort',
  },
  {
    image: 'https://images.unsplash.com/photo-1767339736247-582fcf11442b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcGFyZSUyMHBhcnRzJTIwZW5naW5lfGVufDF8fHx8MTc3MTE3NTIyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Reliable Car Parts',
    subtitle: 'Original and durable auto parts',
  },
];

const ctaButtons = [
  { label: 'Shop Cars', path: '/car-page' },
  { label: 'Buy Tracker', path: '/tracker-page' },
  { label: 'Shop Accessories', path: '/car-accessories' },
  { label: 'Shop Parts', path: '/car-accessories' },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const nav = useNavigate()
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    beforeChange: (_current, next) => setCurrentSlide(next),
    arrows: false,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div className="hero-dots-container">
        <ul className="hero-dots-list">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className={`hero-dot-button ${i === currentSlide ? 'hero-active' : ''}`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  const handleCTAClick = (path) => {
    nav(path)
  };

  return (
    <div className="hero-slider-container">
      {/* Slider */}
      <Slider ref={sliderRef} {...settings} className="hero-slider-wrapper">
        {slides.map((slide, index) => (
          <div key={index} className="hero-slide">
            {/* Background Image */}
            <div
              className="hero-slide-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Gradient Overlay */}
              <div className="hero-slide-overlay" />
            </div>

            {/* Content */}
            <div className="hero-slide-content">
              {/* Logo/Brand */}
              <div className="hero-brand">
                <h1 className="hero-brand-text">
                  E-BEST
                </h1>
              </div>

              {/* Title */}
              <h2 className="hero-title">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="hero-subtitle">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="hero-nav-arrow hero-nav-arrow-left"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="hero-nav-arrow hero-nav-arrow-right"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Fixed CTA Buttons */}
      <div className="hero-cta-section">
        <div className="hero-cta-container">
          {/* Desktop: Row */}
          <div className="hero-cta-grid-desktop">
            {ctaButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleCTAClick(button.path)}
                className="hero-cta-button"
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Tablet: 2x2 Grid */}
          <div className="hero-cta-grid-tablet">
            {ctaButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleCTAClick(button.path)}
                className="hero-cta-button"
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Mobile: Stacked */}
          <div className="hero-cta-grid-mobile">
            {ctaButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleCTAClick(button.path)}
                className="hero-cta-button"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}