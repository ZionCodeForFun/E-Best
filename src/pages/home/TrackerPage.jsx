import { useEffect, useState } from "react";
import { ChevronLeft, Shield, CarFront, Calendar } from "lucide-react";
import "../../style/TrackerPage.css";
import "../../style/pricing.css";
import "../../style/skeleton.css";
import { useNavigate, Link } from "react-router-dom";
import { superbase } from "../../SuperbaseClient";
import { HowItWorks } from "./HowItWork";
import EbestTrackerHero from "../../components/EbestTrackerHero";
function TrackerPage() {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const nav = useNavigate();

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
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  const isPromoActive = (plan) => {
    if (!plan?.promo_expiry) return false;

    const now = new Date();
    const expiry = new Date(plan.promo_expiry);

    return now < expiry;
  };

  const getFinalPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return Math.round(price - (price * discount) / 100);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/8133369509", "_blank");
  };

  if (loadingPlans) {
    return (
      <div className="pricing-container">
        <Link to="/">
          <ChevronLeft className="icon" />
        </Link>

        {/* HEADER SKELETON */}
        <div className="pricing-header-skeleton">
          <div className="skeleton-company-name"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-tagline"></div>
          <div className="skeleton-tagline"></div>
        </div>

        {/* PRICING CARDS SKELETON */}
        <div className="pricing-skeleton-container">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`pricing-card-skeleton ${["exclusive", "premium", "advanced"][idx - 1]}`}
            >
              {/* Promo Badge Skeleton */}
              <div className="skeleton-badge"></div>

              {/* TRACKER ONLY SECTION */}
              <div className="skeleton-option-row">
                <div className="skeleton-option-header">
                  <div className="skeleton-heading"></div>
                  <div className="skeleton-price"></div>
                </div>
                <div className="skeleton-features-list">
                  <div className="skeleton-feature-item"></div>
                  <div className="skeleton-feature-item"></div>
                  <div className="skeleton-feature-item"></div>
                </div>
              </div>

              {/* Divider */}
              <div className="skeleton-divider"></div>

              {/* TRACKER + DASHCAM SECTION */}
              <div className="skeleton-option-row">
                <div className="skeleton-option-header">
                  <div className="skeleton-heading"></div>
                  <div className="skeleton-price"></div>
                </div>
                <div className="skeleton-features-list">
                  <div className="skeleton-feature-item"></div>
                  <div className="skeleton-feature-item"></div>
                  <div className="skeleton-feature-item"></div>
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="skeleton-button"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const exclusive = plans.find((p) => p.plan_name === "Exclusive");
  const premium = plans.find((p) => p.plan_name === "Premium");
  const advanced = plans.find((p) => p.plan_name === "Advanced");

  return (
    <div>
      <EbestTrackerHero />
      <div className="pricing-container">
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">
                <Shield size={32} strokeWidth={2} />
              </div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Protected Vehicles</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <CarFront size={32} strokeWidth={2} />
              </div>
              <div className="stat-number">100+</div>
              <div className="stat-label">Recovered Vehicles</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Calendar size={32} strokeWidth={2} />
              </div>
              <div className="stat-number">2022</div>
              <div className="stat-label">Year Founded</div>
            </div>
          </div>
        </section>

        <main className="pricing-content">
          {plans.map((plan) => {
            const promoActive =
              plan.discount_percent > 0 && isPromoActive(plan);

            const finalTrackerPrice = getFinalPrice(
              plan.tracker_price,
              promoActive ? plan.discount_percent : 0,
            );

            const finalDashcamPrice = getFinalPrice(
              plan.dashcam_price,
              promoActive ? plan.discount_percent : 0,
            );

            return (
              <div
                key={plan.id}
                className={`pricing-card ${plan.plan_name.toLowerCase()}`}
              >
                {promoActive && (
                  <div className="promo-badge">
                    {plan.promo_badge}
                    <span> {plan.discount_percent}% OFF</span>
                  </div>
                )}

                <div className="pricing-badge">
                  {plan.plan_name.toUpperCase()} PACKAGE
                </div>

                {/* TRACKER ONLY */}
                <div className="option-row">
                  <div className="option-header">
                    <h2>Tracker Only</h2>
                    <div className="pricing-amount">
                      {promoActive && (
                        <span className="original-price">
                          {formatPrice(plan.tracker_price)}
                        </span>
                      )}
                      <span className="price">
                        {formatPrice(finalTrackerPrice)}
                      </span>
                    </div>
                  </div>
                  <div className="features-list">
                    <ul>
                      {plan.tracker_features?.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="divider"></div>

                {/* TRACKER + DASHCAM */}
                <div className="option-row">
                  <div className="option-header">
                    <h2>Tracker + Dashcam</h2>
                    <div className="pricing-amount">
                      {promoActive && (
                        <span className="original-price">
                          {formatPrice(plan.dashcam_price)}
                        </span>
                      )}
                      <span className="price">
                        {formatPrice(finalDashcamPrice)}
                      </span>
                    </div>
                  </div>
                  <div className="features-list">
                    {plan.dashcam_features?.length > 0 ? (
                      <ul>
                        {plan.dashcam_features.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="same-features">
                        Same features as above, plus dashcam installation and
                        recording functionality
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className={
                    plan.plan_name === "Exclusive"
                      ? "cta-button-service"
                      : "cta-button-service secondary-service"
                  }
                  onClick={() => nav("/contact")}
                >
                  Get {plan.plan_name} Package
                </button>
              </div>
            );
          })}
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
              <div className="payment-label">
                After installation & test running
              </div>
            </div>
          </div>
        </section>
        <section>
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
                  Manage your vehicle from anywhere using our intuitive mobile
                  app
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
        </section>
        <section>
          <HowItWorks />
        </section>
        {/* BOTTOM CTA */}
        <div className="bottom-cta">
          <button className="cta-wbutton" onClick={handleWhatsApp}>
            Contact Us on WhatsApp
          </button>
        </div>
        <div className="cta-btn-holder">
          <button className="cta-button-app cta-primary-app">
            <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            Download on Play Store
          </button>

          <button className="cta-button-app cta-secondary-app">
            <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.365 1.43c0 1.14-.417 2.29-1.233 3.15-.834.88-2.22 1.57-3.44 1.47-.157-1.11.345-2.32 1.147-3.17.822-.88 2.24-1.55 3.526-1.45zm4.83 16.08c-.34.78-.75 1.54-1.24 2.25-.67.99-1.22 1.67-1.66 2.05-.68.62-1.41.94-2.2.96-.57 0-1.25-.16-2.05-.48-.8-.32-1.54-.48-2.21-.48-.7 0-1.46.16-2.28.48-.82.32-1.48.49-1.98.51-.76.03-1.52-.3-2.28-.99-.49-.43-1.06-1.17-1.71-2.21-.7-1.12-1.27-2.42-1.71-3.9-.47-1.61-.7-3.17-.7-4.68 0-1.73.37-3.21 1.11-4.43.58-.98 1.35-1.75 2.32-2.3.97-.55 2.02-.84 3.15-.86.62 0 1.43.19 2.43.57.99.38 1.63.57 1.92.57.22 0 .97-.23 2.24-.69 1.2-.43 2.22-.61 3.05-.55 2.25.18 3.94 1.07 5.06 2.67-2.01 1.22-3 2.93-2.98 5.12.02 1.71.64 3.14 1.86 4.29.55.53 1.16.94 1.83 1.23-.14.41-.29.81-.46 1.2z" />
            </svg>
            Download on App Store
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackerPage;
