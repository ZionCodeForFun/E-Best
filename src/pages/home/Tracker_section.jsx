// import React, { useState, useEffect, useRef } from "react";
// import "../../style/tracker-section.css";
// import tracker1 from "../../assets/tracker1.jfif";
// import tracker2 from "../../assets/tracker2.jfif";
// import tracker3 from "../../assets/tracker3.jfif";
// import tracker4 from "../../assets/tracker4.jfif";
// import { GoDotFill } from "react-icons/go";

// const trackerImages = [
//   `${tracker1}`,
//   `${tracker2}`,
//   `${tracker3}`,
//   `${tracker4}`,
// ];

// const Tracker_section = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   useEffect(() => {
//     if (paused) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) =>
//         prev === trackerImages.length - 1 ? 0 : prev + 1
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [paused]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     if (touchStartX.current - touchEndX.current > 50) nextSlide();
//     if (touchEndX.current - touchStartX.current > 50) prevSlide();
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === trackerImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? trackerImages.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className="tracker-section-container">
//       <article className="wrapper">
//         <section className="tracker-section-title-holder">
//           <h2>GPS Tracker Installation & Services</h2>
//         </section>
//         <p className="tracker-intro">
//           Track, monitor, and secure your vehicle in real time with our
//           professionally installed GPS tracking solutions.
//         </p>
//         <div className="tracker-content">
//           <ul className="middle-holder">
//             <li>
//               <GoDotFill className="arrow-icon" /> Real-time tracking
//             </li>
//             <li>
//               {" "}
//               <GoDotFill className="arrow-icon" /> Theft alerts
//             </li>
//             <li>
//               {" "}
//               <GoDotFill className="arrow-icon" /> Mobile app access
//             </li>
//             <li>
//               <GoDotFill className="arrow-icon" /> Speed monitoring
//             </li>
//             <li>
//               <GoDotFill className="arrow-icon" /> Geo-fence alerts
//             </li>
//             <li>
//               <GoDotFill className="arrow-icon" /> Engine cut-off
//             </li>
//             <li>
//               <GoDotFill className="arrow-icon" /> Professional installation
//             </li>
//           </ul>
//           <aside
//             className="left-holder"
//             onMouseEnter={() => setPaused(true)}
//             onMouseLeave={() => setPaused(false)}
//             onTouchStart={handleTouchStart}
//             onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               className="carousel"
//               style={{
//                 transform: `translateX(-${currentIndex * 100}%)`,
//               }}
//             >
//               {trackerImages.map((img, index) => (
//                 <img src={img} alt="GPS Tracker" key={index} />
//               ))}
//             </div>
//           </aside>

    
//         </div>

//         <div className="cta-holder">
//           <button className="primary-btn">View Tracker Packages</button>
//           <button className="secondary-btn">See How It Works</button>
//         </div>
//       </article>
//     </div>
//   );
// };

// export default Tracker_section;

 import "../../style/tracker-section.css";

export function GPSTrackerSection() {
  const features = [
    "Real-time GPS tracking",
    "Theft & movement alerts",
    "Mobile app access",
    "Speed monitoring",
    "Geo-fence alerts",
    "Engine cut-off",
    "Professional installation"
  ];

  const images = [
    {
      url: "https://images.unsplash.com/photo-1754821305530-8e3c7b8deda2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjB0cmFja2VyJTIwZGV2aWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njk2ODY4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "GPS tracker device"
    },
    {
      url: "https://images.unsplash.com/photo-1549047608-55b2fd4b8427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGluc3RhbGxhdGlvbiUyMG1lY2hhbmljfGVufDF8fHx8MTc2OTY4NjgyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Vehicle tracker installation"
    },
    {
      url: "https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwR1BTJTIwbWFwJTIwbmF2aWdhdGlvbnxlbnwxfHx8fDE3Njk2ODY4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Live GPS map on mobile phone"
    },
    {
      url: "https://images.unsplash.com/photo-1744199770431-8048f20dedf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWhpY2xlJTIwdHJhY2tpbmclMjBkYXNoYm9hcmQlMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk2ODY4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Vehicle tracking dashboard"
    }
  ];

  return (
    <div className="gps-tracker-section">
      <div className="container">
        <h1 className="section-title">
          GPS Tracker Installation & Services
        </h1>

        <div className="two-columns">
          <div className="features-panel">
            <h2 className="features-title">Features & Benefits</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-bullet"></span>
                  <span className="feature-text" style={{color:"white"}}>{feature}</span>
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
          <button className="cta-button">View Packages</button>
        </div>

        <div className="additional-info">
          <h2>Why Choose Our GPS Tracking Solutions?</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>24/7 Monitoring</h3>
              <p>Round-the-clock tracking and instant alerts for complete peace of mind</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>Professional Setup</h3>
              <p>Expert installation by certified technicians ensures optimal performance</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>Mobile Control</h3>
              <p>Manage your vehicle from anywhere using our intuitive mobile app</p>
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
