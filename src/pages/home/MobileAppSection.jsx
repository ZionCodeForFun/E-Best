import React from 'react';
import { MapPin, Bell, History, Shield, Car } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import '../../style/MobileAppSection.css';

export function MobileAppSection() {
  const features = [
    {
      icon: MapPin,
      text: 'Live location tracking'
    },
    {
      icon: Bell,
      text: 'Instant theft & movement alerts'
    },
    {
      icon: History,
      text: 'Trip history & playback'
    },
    {
      icon: Shield,
      text: 'Geo-fence notifications'
    },
    {
      icon: Car,
      text: 'Multi-vehicle support'
    }
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
            Monitor your vehicle in real time, get instant alerts, view trip history, 
            and manage multiple vehicles from one app.
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

          <div className="cta-buttons">
            <button className="cta-button cta-primary">
              <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Download on Play Store
            </button>
            
            <button className="cta-button cta-secondary">
              <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              View App Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
