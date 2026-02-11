import React from "react";

export function MapPlaceholder() {
  return (
    <section className="contact-page__map">
      <div className="contact-page__map-container">
        <h2 className="contact-page__map-title">Our Service Area</h2>
        <div className="contact-page__map-placeholder">
          <img
            src="https://investorsking.com/wp-content/uploads/2016/12/Vehicle-registration.jpg"
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
