import { Link } from "react-router";
import "../style/servicepage.css";
import { ChevronLeft } from "lucide-react";
import { FaCar, FaTruck, FaVideo } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { MdCarRepair, MdOutlineAutoAwesome } from "react-icons/md";
import { RiSwapLine } from "react-icons/ri";

export default function Services() {
  return (
    <div className="services-container">
      <header className="services-header">
        <Link to="/" className="back-link">
          <ChevronLeft className="icon2" />
        </Link>

        <h1>OUR SERVICES</h1>
        <p className="services-tagline">
          Smart automotive solutions built for security, performance, and peace
          of mind.
        </p>
      </header>

      <main className="services-content">
        <section className="service-card">
          <div className="service-icon">
            <FaCar />
          </div>
          <h2>Vehicle Tracking & Smart Monitoring</h2>
          <p className="service-description">
            Advanced GPS vehicle tracking solutions designed to give you
            complete visibility and control over your vehicle. Monitor real-time
            location, driving behavior, trip history, speed alerts, and ignition
            status through a secure mobile or web platform.
          </p>

          <div className="service-highlight">
            <h3>Security Upgrade Available</h3>
            <h4>Tracker + Dash Cam Bundle</h4>
            <p>
              Combine real-time tracking with in-vehicle dash camera recording
              for enhanced safety, monitoring, and evidence capture. This
              bundled solution is ideal for personal vehicles, ride-hailing
              cars, and fleets that require full visibility on and off the road.
            </p>
            <Link to="/pricing" className="pricing-link-button">
              View Tracker + Dash Cam Pricing
            </Link>
            <p className="install-note">
              Installation available at a bundled price.
            </p>
          </div>
        </section>

        <section className="service-card">
          <div className="service-icon">
            <FaTruck />
          </div>
          <h2>Fleet Management</h2>
          <p className="service-description">
            End-to-end fleet management solutions tailored for businesses and
            organizations. Track multiple vehicles in real time, optimize
            routes, monitor driver performance, reduce fuel costs, and access
            detailed reports to improve efficiency and accountability.
          </p>
        </section>

        <section className="service-card">
          <div className="service-icon">
            <FaVideo />
          </div>
          <h2>Vehicle Surveillance Cameras</h2>
          <p className="service-description">
            Professional installation of vehicle surveillance and dash cameras
            for enhanced security and documentation. Our camera systems help
            protect your vehicle while providing reliable visual records for
            incidents, theft prevention, and insurance purposes.
          </p>
          <div className="ideal-for">
            <strong>Ideal for:</strong>
            <ul>
              <li>Private vehicle owners</li>
              <li>Ride-hailing and logistics services</li>
              <li>Corporate and commercial fleets</li>
            </ul>
          </div>
        </section>

        <section className="service-card">
          <div className="service-icon">
            <GiAutoRepair />
          </div>
          <h2>Auto Upgrade</h2>
          <p className="service-description">
            Enhance your vehicle with modern automotive upgrades that improve
            comfort, functionality, and style. We install advanced infotainment
            systems, safety accessories, and performance-enhancing features
            tailored to your vehicle.
          </p>
        </section>

        <section className="service-card">
          <div className="service-icon">
            <MdCarRepair />
          </div>
          <h2>Vehicle Diagnostics</h2>
          <p className="service-description">
            Comprehensive vehicle diagnostics to identify faults, assess engine
            performance, and prevent unexpected breakdowns. Our diagnostic
            services help ensure optimal vehicle health and long-term
            reliability.
          </p>
        </section>

        <section className="service-card">
          <div className="service-icon">
            <MdOutlineAutoAwesome />
          </div>
          <h2>Auto Detailing</h2>
          <p className="service-description">
            Premium interior and exterior auto detailing services designed to
            restore, protect, and maintain your vehicle's appearance. From deep
            interior cleaning to exterior polishing, we help keep your car
            looking its best.
          </p>
        </section>

        <section className="service-card">
          <div className="service-icon">
            <RiSwapLine />
          </div>
          <h2>Car Swapping</h2>
          <p className="service-description">
            Flexible and secure car swapping solutions to suit your changing
            needs. Whether upgrading or switching vehicle types, we make the
            process smooth, transparent, and hassle-free.
          </p>
        </section>
      </main>
    </div>
  );
}
