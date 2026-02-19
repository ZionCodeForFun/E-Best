import { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, MapPin, Power, Video, Shield } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../style/ebestTrackerHero.css';
import gpsImage1 from '../assets/gps.jpg'

const slides = [
  {
    id: 1,
    image: `${gpsImage1}`,
    title: 'Smart Vehicle Tracking',
    subtitle: 'Real-time GPS monitoring for complete vehicle security and control.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1643686978109-499f1e9d4bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoY2FtJTIwd2luZHNoaWVsZCUyMG1vdW50ZWQlMjBjYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE0Mjk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Advanced Dashcam Protection',
    subtitle: 'Capture every moment with crystal-clear front and rear recording.',
  },
];

const features = [
  {
    id: 1,
    icon: MapPin,
    text: 'Real-Time GPS Tracking',
  },
  {
    id: 2,
    icon: Power,
    text: 'Engine Remote Shutdown',
  },
  {
    id: 3,
    icon: Video,
    text: 'HD Front & Rear Dashcam',
  },
  {
    id: 4,
    icon: Shield,
    text: '24/7 Vehicle Monitoring',
  },
];

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="ebest-tracker-hero-arrow ebest-tracker-hero-arrow-prev"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <ChevronLeft className="ebest-tracker-hero-arrow-icon" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="ebest-tracker-hero-arrow ebest-tracker-hero-arrow-next"
    onClick={onClick}
    aria-label="Next slide"
  >
    <ChevronRight className="ebest-tracker-hero-arrow-icon" />
  </button>
);

export default function EbestTrackerHero() {
  const sliderRef = useRef(null);

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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div className="ebest-tracker-hero-dots-container">
        <ul className="ebest-tracker-hero-dots">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="ebest-tracker-hero-dot" aria-label="Go to slide"></button>
    ),
  };

  return (
    <div className="ebest-tracker-hero-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="ebest-tracker-hero-slide-wrapper">
            <div className="ebest-tracker-hero-slide">
              <div
                className="ebest-tracker-hero-background"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="ebest-tracker-hero-overlay" />
              <div className="ebest-tracker-hero-content">
                <h1 className="ebest-tracker-hero-title">{slide.title}</h1>
                <p className="ebest-tracker-hero-subtitle">{slide.subtitle}</p>
                
                {/* Feature Blocks */}
                <div className="ebest-tracker-hero-features">
                  {features.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={feature.id} className="ebest-tracker-hero-feature-block">
                        <IconComponent className="ebest-tracker-hero-feature-icon" />
                        <span className="ebest-tracker-hero-feature-text">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}