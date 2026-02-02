import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
export function ContactHeader() {
  return (
    <section className="contact-page__header">
         <div className="back-home-contact">
                <Link to="/" className="back-link">
                  <ChevronLeft className="icon" />
                <p className="back-home-track-p">Back to Home</p>
                </Link>
              </div>
      <div className="contact-page__header-container">
        <h1 className="contact-page__title">Contact E-BEST</h1>
        <div className="contact-page__divider"></div>
        <p className="contact-page__subtitle">
          We're here to help with vehicle tracking, car sales, swaps, and dash cam solutions.
        </p>
      </div>
    </section>
  );
}
