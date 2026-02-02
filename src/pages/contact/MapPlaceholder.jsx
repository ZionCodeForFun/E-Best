import React from "react";

export function MapPlaceholder() {
  return (
    <section className="contact-page__map">
      <div className="contact-page__map-container">
        <h2 className="contact-page__map-title">Our Service Area</h2>
        <div className="contact-page__map-placeholder">
          <img
            src="https://images.unsplash.com/photo-1683151284539-d20a6d60d8cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBHUFMlMjB0cmFja2luZyUyMGRldmljZXxlbnwxfHx8fDE3NzAwMzA4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="GPS tracking and automotive services across Nigeria"
            className="contact-page__map-image"
          />
        </div>
        <p className="contact-page__map-caption">
          Our services are available nationwide
        </p>
      </div>
    </section>
  );
}
