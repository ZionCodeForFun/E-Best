import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppCTA() {
  const handleWhatsAppClick = () => {
 
    window.open('https://wa.me/2348133369509', '_blank');
  };

  return (
    <section className="contact-page__whatsapp">
      <div className="contact-page__whatsapp-container">
        <p className="contact-page__whatsapp-text">Need a quick response?</p>
        <button 
          className="contact-page__whatsapp-btn"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle />
          Contact Us on WhatsApp
        </button>
      </div>
    </section>
  );
}
