import { useEffect, useState } from "react";
import { ChevronLeft, Shield, CarFront, Calendar } from "lucide-react";
import "../../style/TrackerPage.css";
import '../../style/pricing.css'
import { useNavigate, Link } from "react-router-dom";
import { superbase } from "../../SuperbaseClient";

function TrackerPage() {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const nav = useNavigate();

  // ================= FETCH PLANS =================
  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await superbase
        .from("trackers_plans")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: true });

      if (!error) {
        setPlans(data || []);
      } else {
        console.error("Error fetching plans:", error);
      }
      setLoadingPlans(false);
    };

    fetchPlans();
  }, []);

  // ================= SLIDER =================
  useEffect(() => {
    const slider = document.querySelector(".image-slider");
    const slides = document.querySelectorAll(".slider-image");
    const dots = document.querySelectorAll(".slider-dot");
    if (!slider || slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;

    function goToSlide(n) {
      currentSlide = n;
      const offset = -currentSlide * 100;
      slider.style.transform = `translateX(${offset}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    autoSlideInterval = setInterval(nextSlide, 4000);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        goToSlide(index);
        autoSlideInterval = setInterval(nextSlide, 4000);
      });
    });

    return () => clearInterval(autoSlideInterval);
  }, []);

  // ================= HELPERS =================
  const getFinalPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return Math.round(price - (price * discount) / 100);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/8133369509", "_blank");
  };

  // ================= PLAN LOOKUPS =================
  const exclusive = plans.find((p) => p.plan_name === "Exclusive");
  const premium = plans.find((p) => p.plan_name === "Premium");
  const advanced = plans.find((p) => p.plan_name === "Advanced");

  return (
    <div className="pricing-container">
        <Link to="/" >
          <ChevronLeft className="icon" />
        </Link>

      <header className="pricing-header">
        <div className="company-name">E-BEST GLOBAL RESOURCES LTD.</div>
        <h1>Exclusive Tracker & Dashcam Packages</h1>
        <p className="pricing-tagline">
          Choose the solution that fits your vehicle or fleet needs. Each package comes with optional dashcam add-ons for enhanced monitoring and security.
        </p>
      </header>

      {/* SLIDER */}
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

      {/* STATS */}
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


        <main className="pricing-content">
          {/* EXCLUSIVE PACKAGE */}
          {exclusive && (
            <div className="pricing-card exclusive">
              {exclusive.promo_badge && (
                <div className="limited-offer-badge">
                  {exclusive.promo_badge} • {exclusive.discount_percent}%
                </div>
              )}
              <div className="pricing-badge">EXCLUSIVE PACKAGE</div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker Only</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">
                      {getFinalPrice(exclusive.tracker_price, exclusive.discount_percent)}
                    </span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    {exclusive.tracker_features?.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker + Dashcam</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">{exclusive.dashcam_price}</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    {exclusive.dashcam_features?.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                  <p className="addon-note">Dashcam Add-ons (If selected)</p>
                </div>
              </div>

              <button className="cta-button-service" onClick={() => nav("/contact")}>
                Get Exclusive Package
              </button>
            </div>
          )}

          {/* PREMIUM PACKAGE */}
          {premium && (
            <div className="pricing-card premium">
              <div className="pricing-badge">PREMIUM PACKAGE</div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker Only</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">{getFinalPrice(premium.tracker_price, premium.discount_percent)}</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    {premium.tracker_features?.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker + Dashcam</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">{premium.dashcam_price}</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    {premium.dashcam_features?.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                  <p className="same-features"> Same features as above, plus dashcam installation and recording functionality </p>
                </div>
              </div>

              <button className="cta-button-service secondary-service" onClick={() => nav("/contact")}>
                Get Premium Package
              </button>
            </div>
          )}

          {/* ADVANCED PACKAGE */}
          {advanced && (
            <div className="pricing-card advanced">
              <div className="pricing-badge">ADVANCED PACKAGE</div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker Only</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">{getFinalPrice(advanced.tracker_price, advanced.discount_percent)}</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    {advanced.tracker_features?.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-row">
                <div className="option-header">
                  <h2>Tracker + Dashcam</h2>
                  <div className="pricing-amount">
                    <span className="currency">₦</span>
                    <span className="price">{advanced.dashcam_price}</span>
                  </div>
                </div>
                <div className="features-list">
                  <ul>
                    {advanced.dashcam_features?.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                  <p className="same-features"> Same features as above, plus dashcam installation and recording functionality </p>
                </div>
              </div>

              <button className="cta-button-service secondary-service" onClick={() => nav("/contact")}>
                Get Advanced Package
              </button>
            </div>
          )}
        </main>
  

      <section className="notes-section">
        <div className="notes-box">
          <p>• One-time subscription fee applies</p>
          <p>• Terms & Conditions apply</p>
          <p>• Extra charges apply for outside jobs (logistics)</p>
        </div>
      </section>

      {/* PAYMENT TERMS */}
      <section className="payment-terms">
        <h3 className="payment-title">Payment Terms</h3>
        <div className="payment-grid">
          <div className="payment-item">
            <div className="payment-percent">50%</div>
            <div className="payment-label">Advance Payment</div>
          </div>
          <div className="payment-item">
            <div className="payment-percent">50%</div>
            <div className="payment-label">After installation & test running</div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <button className="cta-wbutton" onClick={handleWhatsApp}>
          Contact Us on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default TrackerPage;
