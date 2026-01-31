import { useEffect } from "react";
import { ArrowLeft, Shield, CarFront, Calendar } from "lucide-react";
import "../../style/TrackerPage.css";
import { useNavigate } from "react-router-dom";

function TrackerPage() {
  const navigate = useNavigate();
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
    window.open("https://wa.me/2348000000000", "_blank");
  };

  return (
    <div className="ebest-page">
      <header className="page-header">
        <div className="brand-name">E-BEST</div>
        <h1 className="page-title">Tracker Packages</h1>
        <p className="page-subtitle">
          Choose the right GPS tracking plan for your vehicle
        </p>
      </header>

      <section className="slider-section">
        <div className="back-home">
          <button className="back-home-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

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

      <section className="packages-section">
        <div className="package-card">
          <div className="package-header">
            <h3 className="package-name">Advanced Package</h3>
            <p className="package-label">For individual vehicle owners</p>
          </div>
          <div className="package-price">₦100,000</div>
          <ul className="package-features">
            <li>✓ Self-Tracking</li>
            <li>✓ 24/7 Support</li>
            <li>✓ Mobile Tracking</li>
            <li>✓ 100% Compatibility</li>
            <li>✓ Live Location with Map</li>
            <li>✓ Voice Monitoring (Optional)</li>
            <li>✓ SMS Engine Shutdown / Resume</li>
            <li>✓ SOS Emergency System (Optional)</li>
          </ul>
          <button className="package-btn package-btn-blue">
            Choose Advanced
          </button>
        </div>

        <div className="package-card package-card-popular">
          <div className="popular-badge">Most Popular</div>
          <div className="package-header">
            <h3 className="package-name">Premium Package</h3>
            <p className="package-label">Best value for money</p>
          </div>
          <div className="package-price">₦120,000</div>
          <ul className="package-features">
            <li>✓ Self-Tracking</li>
            <li>✓ 24/7 Support</li>
            <li>✓ Mobile Tracking</li>
            <li>✓ 100% Compatibility</li>
            <li>✓ Live Location with Map</li>
            <li>✓ Voice Monitoring (Optional)</li>
            <li>✓ SMS Engine Shutdown / Resume</li>
            <li>✓ SOS Emergency System (Optional)</li>
            <li>✓ ACC Ignition Detection</li>
            <li>✓ Fleet Management (Max 5 vehicles)</li>
            <li>✓ Mobile App Tracking</li>
            <li>✓ Web / PC Tracking</li>
            <li>✓ Over-Speed Alert</li>
            <li>✓ History Record</li>
            <li>✓ Geo-Fencing</li>
            <li>✓ Accident Alert</li>
          </ul>
          <button className="package-btn package-btn-red">
            Choose Premium
          </button>
        </div>

        <div className="package-card">
          <div className="package-header">
            <h3 className="package-name">Exclusive Package</h3>
            <p className="package-label">For fleets & trucks</p>
          </div>
          <div className="package-price">₦150,000</div>
          <ul className="package-features">
            <li>✓ Self-Tracking</li>
            <li>✓ 24/7 Support</li>
            <li>✓ Mobile Tracking</li>
            <li>✓ 100% Compatibility</li>
            <li>✓ Live Location with Map</li>
            <li>✓ Voice Monitoring (Optional)</li>
            <li>✓ SMS Engine Shutdown / Resume</li>
            <li>✓ SOS Emergency System (Optional)</li>
            <li>✓ ACC Ignition Detection</li>
            <li>✓ Fleet Management (Unlimited)</li>
            <li>✓ Mobile App Tracking</li>
            <li>✓ Web / PC Tracking</li>
            <li>✓ Over-Speed Alert</li>
            <li>✓ History Record</li>
            <li>✓ Geo-Fencing</li>
            <li>✓ Accident Alert</li>
            <li>✓ Fuel Gauge Monitoring (Trucks only)</li>
            <li>✓ Trip Fuel Consumption Summary</li>
          </ul>
          <button className="package-btn package-btn-dark">
            Contact Sales
          </button>
        </div>
      </section>

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
