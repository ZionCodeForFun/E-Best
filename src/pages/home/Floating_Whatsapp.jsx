import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import '../../style/floating_Whatsapp.css';

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348133369509', '_blank');
  };

  return (
    <span 
      className="floating-whatsapp"
      onClick={handleWhatsAppClick}
      aria-label="Contact us on WhatsApp"
    >
      <IoLogoWhatsapp size={28} />
    </span>
  );
}