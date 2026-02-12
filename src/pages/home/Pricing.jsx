import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import "../../style/pricing.css";
import "../../style/skeleton.css";
import { useNavigate, Link } from "react-router-dom";
import { superbase } from "../../SuperbaseClient";

export default function Pricing() {
  const nav = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    };

    fetchPlans();
  }, []);

  const getFinalPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return Math.round(price - (price * discount) / 100);
  };

  if (loading) {
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

  return (
    <div className="pricing-container">
      <Link to="/">
        <ChevronLeft className="icon" />
      </Link>

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
        {plans.map((plan) => {
          const discountedTrackerPrice = getFinalPrice(
            plan.tracker_price,
            plan.discount_percent,
          );
          const discountedDashcamPrice = getFinalPrice(
            plan.dashcam_price,
            plan.discount_percent,
          );

          return (
            <div
              key={plan.id}
              className={`pricing-card ${plan.plan_name?.toLowerCase()}`}
            >
              {/* PROMO BADGE */}
              {plan.promo_badge && (
                <div className="promo-badge">
                  {plan.promo_badge}
                  {plan.discount_percent > 0 && (
                    <span> • {plan.discount_percent}% OFF</span>
                  )}
                </div>
              )}

              <div className="pricing-badge">
                {plan.plan_name?.toUpperCase()} PACKAGE
              </div>

              <div className="package-options">
                {/* TRACKER ONLY */}
                <div className="option-row">
                  <div className="option-header">
                    <h2>Tracker Only</h2>
                    <div className="pricing-amount">
                      {plan.discount_percent > 0 && (
                        <span className="original-price">
                          ₦{plan.tracker_price}
                        </span>
                      )}
                      <span className="currency">₦</span>
                      <span className="price">{discountedTrackerPrice}</span>
                    </div>
                  </div>
                  <div className="features-list">
                    <ul>
                      {plan.tracker_features?.map((feature, i) => (
                        <li key={i}>• {feature}</li>
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
                      {plan.discount_percent > 0 && (
                        <span className="original-price">
                          ₦{plan.dashcam_price}
                        </span>
                      )}
                      <span className="currency">₦</span>
                      <span className="price">{discountedDashcamPrice}</span>
                    </div>
                  </div>
                  <div className="features-list">
                    {plan.dashcam_features?.length > 0 ? (
                      <ul>
                        {plan.dashcam_features.map((feature, i) => (
                          <li key={i}>• {feature}</li>
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
              </div>

              <button
                className="cta-button-service"
                onClick={() => nav("/contact")}
              >
                Get {plan.plan_name} Package
              </button>
            </div>
          );
        })}
      </main>

      <div className="pricing-footer">
        <Link to="/service" className="back-link-service">
          ← Back to Services
        </Link>
      </div>
    </div>
  );
}
