import React from 'react';
import { ContactHeader } from '../contact/ContactHeader';
import { ContactInfoCards } from '../contact/ContactInforCard';
import { ContactForm } from '../contact/Contactform';
import { WhatsAppCTA } from '../contact/WhatsappCTA';
import { MapPlaceholder } from '../contact/MapPlaceholder';
import '../../style/contact.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <ContactHeader />
      <ContactInfoCards />
      <ContactForm />
      <WhatsAppCTA />
      <MapPlaceholder />
    </div>
  );
}
