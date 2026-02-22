import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import "../style/pricing.css";
import "../style/skeleton.css";
import { useNavigate, Link } from "react-router-dom";
import { superbase } from "../SuperbaseClient";

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
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);

  if (loading) {
    return (
      <div className="pricing-container">
        <Link to="/">
          <ChevronLeft className="icon" />
        </Link>

        <div className="pricing-header-skeleton">
          <div className="skeleton-company-name"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-tagline"></div>
          <div className="skeleton-tagline"></div>
        </div>

        <div className="pricing-skeleton-container">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`pricing-card-skeleton ${["exclusive", "premium", "advanced"][idx - 1]}`}
            >
              <div className="skeleton-badge"></div>

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

              <div className="skeleton-divider"></div>

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
          const promoActive = plan.discount_percent > 0 && isPromoActive(plan);

          const finalTrackerPrice = formatPrice(
            getFinalPrice(
              plan.tracker_price,
              promoActive ? plan.discount_percent : 0,
            ),
          );

          const finalDashcamPrice = formatPrice(
            getFinalPrice(
              plan.dashcam_price,
              promoActive ? plan.discount_percent : 0,
            ),
          );

          return (
            <div
              key={plan.id}
              className={`pricing-card ${plan.plan_name?.toLowerCase()}`}
            >
              {promoActive && (
                <div className="promo-badge">
                  {plan.promo_badge}
                  <span> {plan.discount_percent}% OFF</span>
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
                      {promoActive && (
                        <span className="original-price">
                          {formatPrice(plan.tracker_price)}
                        </span>
                      )}
                      <span className="price">{finalTrackerPrice}</span>
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
                      {promoActive && (
                        <span className="original-price">
                          {formatPrice(plan.dashcam_price)}
                        </span>
                      )}
                      <span className="price">{finalDashcamPrice}</span>
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
