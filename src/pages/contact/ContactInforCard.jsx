import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ContactInfoCards() {
  return (
    <section className="contact-page__info-section">
      <div className="contact-page__info-grid">
        {/* Phone/WhatsApp Card */}
        <div className="contact-page__info-card">
          <div className="contact-page__info-icon">
            <Phone />
          </div>
          <h3 className="contact-page__info-title">Phone / WhatsApp</h3>
          <p className="contact-page__info-text">
            Chat with us instantly on WhatsApp
          </p>
        </div>

        {/* Email Card */}
        <div className="contact-page__info-card">
          <div className="contact-page__info-icon">
            <Mail />
          </div>
          <h3 className="contact-page__info-title">Email</h3>
          <p className="contact-page__info-text">
            Send us an email for enquiries
          </p>
        </div>

        {/* Location Card */}
        <div className="contact-page__info-card">
          <div className="contact-page__info-icon">
            <MapPin />
          </div>
          <h3 className="contact-page__info-title">Office Location</h3>
          <p className="contact-page__info-text">
            Serving clients across Nigeria
          </p>
        </div>
      </div>
    </section>
  );
}
