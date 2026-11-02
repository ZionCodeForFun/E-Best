import React from "react";
import { HeroSlider } from "./Hero_section";
import { CarsSection } from "./Car_section";
import { GPSTrackerSection } from "./Tracker_section";
import FloatingWhatsApp from "./Floating_Whatsapp"
import CarAccessories from "./CarAccessories";
const Landing = () => {
  return (
    <div>
      <HeroSlider />
      <FloatingWhatsApp />
      <CarsSection />
      <CarAccessories />
      <GPSTrackerSection />

    </div>
  );
};

export default Landing;
