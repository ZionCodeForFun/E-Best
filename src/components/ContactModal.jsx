import React, { useEffect } from "react";
import "../style/contactModal.css";

export default function ContactModal({
  isOpen,
  onClose,
  phone = "+2348133369509",
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const telLink = `tel:${phone}`;
  const waNumber = phone.replace(/^\+/, "").replace(/^0/, "");
  const waLink = `https://wa.me/${waNumber.startsWith("234") ? waNumber : waNumber}`;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("ebest-contact-modal-overlay")) onClose();
  };

  return (
    <div
      className="ebest-contact-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="ebest-contact-modal-container">
        <button
          className="ebest-contact-modal-close"
          aria-label="Close contact modal"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="ebest-contact-modal-title">Contact Us</h2>
        <p className="ebest-contact-modal-message">
          Choose your preferred contact method
        </p>

        <div className="ebest-contact-modal-actions">
          <a
            href={telLink}
            className="ebest-contact-modal-btn ebest-contact-modal-btn--call"
          >
            Call Now
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ebest-contact-modal-btn ebest-contact-modal-btn--wa"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
