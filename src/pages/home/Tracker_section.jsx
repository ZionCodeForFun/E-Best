import "../../style/tracker-section.css";
import { useNavigate } from "react-router-dom";
export function GPSTrackerSection() {
  const nav = useNavigate();
  const features = [
    "Real-time GPS tracking",
    "Theft & movement alerts",
    "Mobile app access",
    "Geo-fence alerts",
    "Front & Rear Camera",
    "HD Video Recording",
    "Night vision & Loop Recording",
    "Audio Recording",
  ];

  const images = [
    {
      url: "https://images.unsplash.com/photo-1754821305530-8e3c7b8deda2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjB0cmFja2VyJTIwZGV2aWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njk2ODY4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "GPS tracker device",
    },
    {
      url: "https://images.unsplash.com/photo-1549047608-55b2fd4b8427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGluc3RhbGxhdGlvbiUyMG1lY2hhbmljfGVufDF8fHx8MTc2OTY4NjgyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Vehicle tracker installation",
    },
    {
      url: "https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwR1BTJTIwbWFwJTIwbmF2aWdhdGlvbnxlbnwxfHx8fDE3Njk2ODY4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Live GPS map on mobile phone",
    },
    {
      url: "https://images.unsplash.com/photo-1744199770431-8048f20dedf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWhpY2xlJTIwdHJhY2tpbmclMjBkYXNoYm9hcmQlMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk2ODY4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Vehicle tracking dashboard",
    },
  ];

  return (
    <div className="gps-tracker-section">
      <div className="container">
        <h2 className="section-title">
          GPS Tracker & Dash Cam Installation & Services
        </h2>
        <p className="section-subtitle">
          Real-time GPS tracking, dash cameras & professional installation
        </p>
        <div className="two-columns">
          <div className="features-panel">
            <h2 className="features-title">Features & Benefits</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-bullet"></span>
                  <span className="feature-text" style={{ color: "white" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="images-panel">
            <div className="primary-image">
              <img src={images[0].url} alt={images[0].alt} />
            </div>
            <div className="secondary-images">
              {images.slice(1).map((image, index) => (
                <div key={index} className="secondary-image">
                  <img src={image.url} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-container">
          <button className="cta-button" onClick={() => nav("/tracker-page")}>
            View Packages
          </button>
        </div>

        <div className="additional-info">
          <h2>Why Choose Our GPS Tracking Solutions?</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>24/7 Monitoring</h3>
              <p>
                Round-the-clock tracking and instant alerts for complete peace
                of mind
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>Professional Setup</h3>
              <p>
                Expert installation by certified technicians ensures optimal
                performance
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>Mobile Control</h3>
              <p>
                Manage your vehicle from anywhere using our intuitive mobile app
              </p>
            </div>
          </div>
        </div>

        <div className="service-details">
          <div className="service-card">
            <h3>Installation Services</h3>
            <ul>
              <li>Same-day installation available</li>
              <li>Certified technicians with 10+ years experience</li>
              <li>Discreet installation for maximum security</li>
              <li>Compatible with all vehicle makes and models</li>
              <li>1-year warranty on all installations</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Monitoring Features</h3>
            <ul>
              <li>Live location updates every 10 seconds</li>
              <li>Historical route playback up to 12 months</li>
              <li>Instant SMS and email notifications</li>
              <li>Multi-vehicle fleet management</li>
              <li>Detailed reports and analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
