import { useEffect } from "react";
import { ChevronLeft, Shield, CarFront, Calendar } from "lucide-react";
import "../../style/TrackerPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TrackerPage() {
  const nav = useNavigate()
  useEffect(() => {
    const slider = document.querySelector(".image-slider");
    const slides = document.querySelectorAll(".slider-image");
    const dots = document.querySelectorAll(".slider-dot");
    let currentSlide = 0;
    let autoSlideInterval;

    function goToSlide(n) {
      currentSlide = n;
      const offset = -currentSlide * 100;
      slider.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }

    function startAutoSlide() {
      autoSlideInterval = window.setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopAutoSlide();
        goToSlide(index);
        startAutoSlide();
      });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector(".slider-container");

    sliderContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        stopAutoSlide();
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
        startAutoSlide();
      }
    }

    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/8133369509", "_blank");
  };

  return (
    <div className="ebest-page">
      <div className="back-home-track">
        <Link to="/" className="back-link">
          <ChevronLeft className="icon" />
        <p className="back-home-track-p">Back to Home</p>
        </Link>
      </div>
      <header className="pricing-header">
        <div className="company-name">E-BEST GLOBAL RESOURCES LTD.</div>
        <h1>Exclusive Tracker & Dashcam Packages</h1>
        <p className="pricing-tagline">
          Choose the solution that fits your vehicle or fleet needs. Each
          package comes with optional dashcam add-ons for enhanced monitoring
          and security.
        </p>
      </header>

      <section className="slider-section">
        <div className="slider-container">
          <div className="image-slider">
            <div className="slider-image">
              <img
                src="https://images.unsplash.com/photo-1747862712508-e1290330085f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHUFMlMjB0cmFja2VyJTIwZGV2aWNlJTIwY2xvc2V1cHxlbnwxfHx8fDE3Njk3NjMwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="GPS Tracker Device"
              />
            </div>
            <div className="slider-image">
              <img
                src="https://images.unsplash.com/photo-1761264889291-52edcd3979b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjBtb2Rlcm4lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2OTc2MzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Car Dashboard"
              />
            </div>
            <div className="slider-image">
              <img
                src="https://images.unsplash.com/photo-1764347923709-fc48487f2486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMEdQUyUyMHRyYWNraW5nJTIwbWFwJTIwbG9jYXRpb258ZW58MXx8fHwxNzY5NzYzMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Phone GPS Tracking"
              />
            </div>
          </div>
        </div>
        <div className="slider-dots">
          <span className="slider-dot active"></span>
          <span className="slider-dot"></span>
          <span className="slider-dot"></span>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <Shield size={32} strokeWidth={2} />
            </div>
            <div className="stat-number">1,200+</div>
            <div className="stat-label">Protected Vehicles</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <CarFront size={32} strokeWidth={2} />
            </div>
            <div className="stat-number">320+</div>
            <div className="stat-label">Recovered Vehicles</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={32} strokeWidth={2} />
            </div>
            <div className="stat-number">2018</div>
            <div className="stat-label">Year Founded</div>
          </div>
        </div>
      </section>
      <div className="pricing-container">
        <header className="pricing-header">
          <div className="company-name">E-BEST GLOBAL RESOURCES LTD.</div>
          <h1>Exclusive Tracker & Dashcam Packages</h1>
          <p className="pricing-tagline">
            Choose the solution that fits your vehicle or fleet needs. Each
            package comes with optional dashcam add-ons for enhanced monitoring
            and security.
          </p>
        </header>

        <main className="pricing-content">
          {/* EXCLUSIVE PACKAGE */}
          <div className="pricing-card exclusive">
            <div className="pricing-badge">EXCLUSIVE PACKAGE</div>
            <div className="package-options">
              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker Only</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">150,000</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    <li>• Self-Tracking (User-controlled access)</li>
                    <li>• 24/7 Support</li>
                    <li>• Mobile & Web/PC Tracking</li>
                    <li>• 100% Vehicle Compatibility</li>
                    <li>• Voice Monitoring (Optional)</li>
                    <li>• SMS Engine Shutdown/Resume</li>
                    <li>• SOS Emergency System (Optional)</li>
                    <li>• ACC Ignition Detection</li>
                    <li>• Fleet Management Dashboard</li>
                    <li>• Over Speed Alert</li>
                    <li>• Trip History Records</li>
                    <li>• Accident Alert System</li>
                  </ul>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker + Dashcam</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">400,000</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    <li>• Diral Lens FOV (Front/Cabin/Rear)</li>
                    <li>• Night Vision</li>
                    <li>• Loop Recording</li>
                    <li>• Motion Detection</li>
                    <li>• Built-In Mic for Audio + Recording</li>
                    <li>• SOS Engine Shutdown (Optional)</li>
                    <li>• ACC Emergency Button (Optional)</li>
                    <li>• Fleet Management</li>
                    <li>• Over Speed Notification</li>
                    <li>• Travel History Records</li>
                    <li>• Geo-Fencing System</li>
                  </ul>
                  <p className="addon-note">Dashcam Add-ons (If selected)</p>
                </div>
              </div>
            </div>
            <button className="cta-button-service" onClick={()=>nav('/contact')}>Get Exclusive Package</button>
          </div>

          {/* PREMIUM PACKAGE */}
          <div className="pricing-card premium">
            <div className="pricing-badge">PREMIUM PACKAGE</div>
            <div className="package-options">
              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker Only</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">120,000</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    <li>• Self-Tracking</li>
                    <li>• 24/7 Support</li>
                    <li>• Mobile & Web/PC Tracking</li>
                    <li>• 100% Compatibility</li>
                    <li>• Voice Monitoring (Optional)</li>
                    <li>• SMS Engine Shutdown/Resume</li>
                    <li>• SOS Emergency Function (Optional)</li>
                  </ul>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker + Dashcam</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">370,000</span>
                  </div>
                </div>
                <div className="features-list">
                  <p className="same-features">
                    Same features as above, plus dashcam installation and
                    recording functionality
                  </p>
                </div>
              </div>
            </div>
            <button className="cta-button-service secondary-service" onClick={()=>nav('/contact')}>
              Get Premium Package
            </button>
          </div>

          {/* ADVANCED PACKAGE */}
          <div className="pricing-card advanced">
            <div className="pricing-badge">ADVANCED PACKAGE</div>
            <div className="package-options">
              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker Only</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">100,000</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    <li>• Self-Tracking</li>
                    <li>• 24/7 Support</li>
                    <li>• Mobile Tracking App</li>
                    <li>• Real-time Map Location</li>
                    <li>• Voice Monitoring (Optional)</li>
                    <li>• SOS Engine Function (Optional)</li>
                    <li>• 100% Compatibility with Most Vehicles</li>
                  </ul>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker + Dashcam</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">350,000</span>
                  </div>
                </div>
                <div className="features-list">
                  <p className="same-features">
                    Same features as above, plus dashcam installation and
                    recording functionality
                  </p>
                </div>
              </div>
            </div>
            <button className="cta-button-service secondary-service" onClick={()=>nav('/contact')}>
              Get Advanced Package
            </button>
          </div>
        </main>

   
      </div>

      <section className="notes-section">
        <div className="notes-box">
          <p>• One-time subscription fee applies</p>
          <p>• Terms & Conditions apply</p>
          <p>• Extra charges apply for outside jobs (logistics)</p>
        </div>
      </section>

      <section className="payment-terms">
        <h3 className="payment-title">Payment Terms</h3>
        <div className="payment-grid">
          <div className="payment-item">
            <div className="payment-percent">50%</div>
            <div className="payment-label">Advance Payment</div>
          </div>
          <div className="payment-item">
            <div className="payment-percent">50%</div>
            <div className="payment-label">
              After installation & test running
            </div>
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <button className="cta-wbutton" onClick={handleWhatsApp}>
          Contact Us on WhatsApp
        </button>
      </div>
    </div>
  );
}
export default TrackerPage;
