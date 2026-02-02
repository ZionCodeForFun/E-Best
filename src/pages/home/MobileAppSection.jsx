import React from "react";
import { MapPin, Bell, History, Shield, Car } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import "../../style/MobileAppSection.css";

export function MobileAppSection() {
  const features = [
    {
      icon: MapPin,
      text: "Live location tracking",
    },
    {
      icon: Bell,
      text: "Instant theft & movement alerts",
    },
    {
      icon: History,
      text: "Trip history & playback",
    },
    {
      icon: Shield,
      text: "Geo-fence notifications",
    },
    {
      icon: Car,
      text: "Multi-vehicle support",
    },
  ];

  return (
    <section className="mobile-app-section">
      <div className="mobile-app-container">
        <div className="phone-mockup-wrapper">
          <PhoneMockup />
        </div>

        <div className="content-wrapper">
          <h2 className="headline">Control Your Vehicle From Your Phone</h2>

          <p className="subtext">
            Monitor your vehicle in real time, get instant alerts, view trip
            history, and manage multiple vehicles from one app.
          </p>

          <ul className="features-list">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={index} className="feature-item">
                  <div className="feature-icon">
                    <Icon size={20} />
                  </div>
                  <span className="feature-text">{feature.text}</span>
                </li>
              );
            })}
          </ul>

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
    </section>
  );
}
