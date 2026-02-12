import React from 'react';
import { MapPin, Navigation, Activity, Bell } from 'lucide-react';
import '../../style/PhoneMockup.css';

export function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="app-interface">
            <div className="app-header">
              <div className="app-header-content">
                <h3 className="app-title">My Vehicles</h3>
                <Bell className="app-notification-icon" size={20} />
              </div>
            </div>

            <div className="map-preview">
              <div className="map-overlay">
                <div className="map-grid"></div>
                <div className="vehicle-marker">
                  <Navigation size={20} />
                </div>
                <div className="map-route"></div>
              </div>
            </div>

            <div className="vehicle-card">
              <div className="vehicle-card-header">
                <div className="vehicle-info">
                  <h4 className="vehicle-name">Toyota Camry 2024</h4>
                  <p className="vehicle-plate">ABC-1234</p>
                </div>
                <div className="vehicle-status">
                  <div className="status-indicator active"></div>
                  <span className="status-text">Moving</span>
                </div>
              </div>

              <div className="vehicle-stats">
                <div className="stat-item">
                  <MapPin size={16} className="stat-icon" />
                  <div className="stat-content">
                    <p className="stat-label">Current Location</p>
                    <p className="stat-value">Lekki, phase1</p>
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <Activity size={16} className="stat-icon" />
                  <div className="stat-content">
                    <p className="stat-label">Speed</p>
                    <p className="stat-value">45 km/h</p>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <button className="action-btn">
                  <MapPin size={18} />
                  <span>Track</span>
                </button>
                <button className="action-btn">
                  <Activity size={18} />
                  <span>History</span>
                </button>
                <button className="action-btn">
                  <Bell size={18} />
                  <span>Alerts</span>
                </button>
              </div>
            </div>

            <div className="vehicle-list-item">
              <div className="vehicle-list-info">
                <h5 className="vehicle-list-name">Honda Civic 2023</h5>
                <p className="vehicle-list-status">
                  <div className="status-indicator parked"></div>
                  Parked • 2.3 km away
                </p>
              </div>
              <Navigation size={16} className="vehicle-list-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
