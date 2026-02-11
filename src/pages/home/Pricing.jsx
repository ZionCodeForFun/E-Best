import { ChevronLeft } from "lucide-react";
import "../../style/pricing.css";
import { useNavigate, Link } from "react-router";
export default function Pricing() {
  const nav = useNavigate();
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
          <button
            className="cta-button-service"
            onClick={() => nav("/contact")}
          >
            Get Exclusive Package
          </button>
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
          <button
            className="cta-button-service secondary-service"
            onClick={() => nav("/contact")}
          >
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
          <button
            className="cta-button-service secondary-service"
            onClick={() => nav("/contact")}
          >
            Get Advanced Package
          </button>
        </div>
      </main>

      <div className="pricing-footer">
        <Link to="/service" className="back-link-service">
          ← Back to Services
        </Link>
      </div>
    </div>
  );
}
