import React from "react";
import { HeroSlider } from "./Hero_section";
import { CarsSection } from "./Car_section";
import { GPSTrackerSection } from "./Tracker_section";
import { HowItWorks } from "./HowItWork";
import { MobileAppSection } from "./MobileAppSection";
import CarAccessories from "./CarAccessories";
const Landing = () => {
  return (
    <div>
      <HeroSlider />
      <CarsSection />
      <CarAccessories />
      <GPSTrackerSection />
      <HowItWorks />
      <MobileAppSection />
    </div>
  );
};

export default Landing;
