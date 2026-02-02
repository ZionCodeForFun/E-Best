import {
  MapPin,
  Car,
  RefreshCw,
  Camera,
  CheckCircle,
  Shield,
  Users,
  Award,
  Target,
  Eye,
  TrendingUp,
  Calendar,
} from "lucide-react";
import "../../style/about.css";

import { useNavigate, Link } from "react-router-dom";
export default function About() {
  const nav = useNavigate();
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Pattern */}
        <div className="hero-pattern">
          <div className="hero-pattern-inner"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title-about">
            Driving Security, Mobility & Smart Automotive Solutions
          </h1>
          <div className="hero-divider"></div>
          <p className="hero-subtitle-about">
            E-BEST provides reliable vehicle tracking, quality car sales,
            flexible car swaps, and advanced dash cam installations tailored for
            modern drivers.
          </p>
          <button className="hero-button" onClick={() => nav("/service")}>
            Explore Our Services
          </button>
        </div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are-section">
        <div className="section-container">
          <div className="two-column-grid">
            <div>
              <h2 className="section-title">Who We Are</h2>
              <p className="section-text">
                E-BEST is a trusted automotive solutions brand focused on
                improving vehicle security, ownership experience, and road
                safety. From advanced GPS tracking systems to quality car sales
                and dash cam installations, we help our clients stay protected,
                informed, and confident on the road.
              </p>
            </div>
            <div className="image-wrapper">
              <div className="image-card">
                <img
                  src="https://images.unsplash.com/photo-1759256243611-502772ac391b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBtYXB8ZW58MXx8fHwxNzcwMDI1ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Automotive Technology"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Core Services */}
      <section className="what-we-do-section">
        <div className="section-container">
          <h2 className="section-title text-center mb-12">What We Do</h2>

          <div className="services-grid">
            {/* GPS Vehicle Tracking */}
            <div className="service-card-about">
              <div className="service-icon-wrapper">
                <MapPin className="service-icon-about" />
              </div>
              <h3 className="service-title">GPS Vehicle Tracking</h3>
              <p className="service-description">
                Real-time tracking, theft recovery, remote monitoring, and fleet
                management solutions.
              </p>
            </div>

            {/* Car Sales */}
            <div className="service-card-about">
              <div className="service-icon-wrapper">
                <Car className="service-icon-about" />
              </div>
              <h3 className="service-title">Car Sales</h3>
              <p className="service-description">
                Carefully selected brand new, foreign used, and Nigerian used
                vehicles.
              </p>
            </div>

            {/* Car Swap Services */}
            <div className="service-card-about">
              <div className="service-icon-wrapper">
                <RefreshCw className="service-icon-about" />
              </div>
              <h3 className="service-title">Car Swap Services</h3>
              <p className="service-description">
                Flexible car swap options to upgrade or change vehicles with
                ease.
              </p>
            </div>

            {/* Dash Cam Installation */}
            <div className="service-card-about">
              <div className="service-icon-wrapper">
                <Camera className="service-icon-about" />
              </div>
              <h3 className="service-title">Dash Cam Installation</h3>
              <p className="service-description">
                Front & rear dash cameras for safety, evidence, and driver
                accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose E-BEST */}
      <section className="why-choose-section">
        <div className="section-container">
          <h2 className="why-choose-title">Why Choose E-BEST</h2>

          <div className="why-choose-grid">
            <div className="why-choose-item">
              <Shield className="why-choose-icon" />
              <p className="why-choose-text">
                Professional installation & support
              </p>
            </div>
            <div className="why-choose-item">
              <Users className="why-choose-icon" />
              <p className="why-choose-text">Trusted automotive expertise</p>
            </div>
            <div className="why-choose-item">
              <Award className="why-choose-icon" />
              <p className="why-choose-text">Transparent pricing</p>
            </div>
            <div className="why-choose-item">
              <CheckCircle className="why-choose-icon" />
              <p className="why-choose-text">Reliable after-sales service</p>
            </div>
            <div className="why-choose-item">
              <TrendingUp className="why-choose-icon" />
              <p className="why-choose-text">Technology-driven solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="section-container">
          <div className="mission-vision-grid">
            {/* Mission Card */}
            <div className="mission-vision-card">
              <div className="mission-vision-header">
                <div className="mission-vision-icon-wrapper">
                  <Target className="mission-vision-icon" />
                </div>
                <h3 className="mission-vision-title">Our Mission</h3>
              </div>
              <p className="mission-vision-text">
                To deliver secure, innovative, and reliable automotive solutions
                that protect vehicles, empower owners, and improve road safety.
              </p>
            </div>

            {/* Vision Card */}
            <div className="mission-vision-card">
              <div className="mission-vision-header">
                <div className="mission-vision-icon-wrapper">
                  <Eye className="mission-vision-icon" />
                </div>
                <h3 className="mission-vision-title">Our Vision</h3>
              </div>
              <p className="mission-vision-text">
                To become a leading automotive technology and mobility solutions
                provider in Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators / Stats */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {/* Protected Vehicles */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Shield className="stat-icon" />
              </div>
              <div className="stat-number">1,200+</div>
              <p className="stat-label">Protected Vehicles</p>
            </div>

            {/* Recovered Vehicles */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <CheckCircle className="stat-icon" />
              </div>
              <div className="stat-number">300+</div>
              <p className="stat-label">Recovered Vehicles</p>
            </div>

            {/* Year Founded */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Calendar className="stat-icon" />
              </div>
              <div className="stat-number">2018</div>
              <p className="stat-label">Year Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-container-about">
          <h2 className="cta-title">
            Ready to Secure or Upgrade Your Vehicle?
          </h2>
          <p className="cta-text">
            Let E-BEST help you take control of your vehicle's safety and value.
          </p>
          <a
            href="https://wa.me/+2348133369509/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            <svg className="whatsapp-icon" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>
          <div className="pricing-footer">
                <Link to="/service" className="back-link-service">
                  ← Back to home
                </Link>
              </div>
      </section>

    </div>
  );
}
