import React, { useState } from "react";
import emailjs from "emailjs-com";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_hnyyc09",
        "template_bhfw79c",
        formData,
        "pi5DFj8CLlisdSMAZ"
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });

        // OPTIONAL: redirect after success
        // setTimeout(() => navigate("/thank-you"), 2000);
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong. Please try again.");
        console.error(error);
      });
  };

  return (
    <section className="contact-page__form-section">
      <div className="contact-page__form-container">
        <div className="contact-page__form-content">
          <h2 className="contact-page__form-title">Send Us a Message</h2>

          {success && (
            <div className="contact-page__success-message">
              ✅ Message sent successfully! We’ll contact you shortly.
            </div>
          )}

          <form className="contact-page__form" onSubmit={handleSubmit}>
            <div className="contact-page__form-group">
              <label className="contact-page__label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="contact-page__input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-page__form-group">
              <label className="contact-page__label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="contact-page__input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-page__form-group">
              <label className="contact-page__label">Email</label>
              <input
                type="email"
                name="email"
                className="contact-page__input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-page__form-group">
              <label className="contact-page__label">Service</label>
              <select
                name="service"
                className="contact-page__select"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="GPS Tracking">GPS Tracking</option>
                <option value="Car Sales">Car Sales</option>
                <option value="Car Swap">Car Swap</option>
                <option value="Dash Cam">Dash Cam</option>
              </select>
            </div>

            <div className="contact-page__form-group">
              <label className="contact-page__label">Message</label>
              <textarea
                name="message"
                className="contact-page__textarea"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-page__submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-page__form-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1758411897888-3ca658535fdf"
            alt="Automotive technology"
            className="contact-page__form-image"
          />
        </div>
      </div>
    </section>
  );
}
