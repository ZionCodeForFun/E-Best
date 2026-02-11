import { ChevronLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
export function ContactHeader() {
  return (
    <section className="contact-page__header">
      <Link to="/" className="back-link">
        <ChevronLeft className="icon" />
      </Link>
      <div className="contact-page__header-container">
        <h1 className="contact-page__title">Contact E-BEST</h1>
        <div className="contact-page__divider"></div>
        <p className="contact-page__subtitle">
          We're here to help with vehicle tracking, car sales, swaps, and dash
          cam solutions.
        </p>
      </div>
    </section>
  );
}
