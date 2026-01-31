import React from "react";
import Hero_section from "./Hero_section";
import {CarsSection} from "./Car_section";
import {GPSTrackerSection} from "./Tracker_section";
import {HowItWorks} from "./HowItWork";
import {MobileAppSection} from "./MobileAppSection";
// import CarDetailsPage from "./CarDetails";
const Landing = () => {
  return (
    <div>
      <Hero_section />
      <CarsSection />
      <GPSTrackerSection />
      <HowItWorks />
      <MobileAppSection />
      {/* <CarDetailsPage /> */}
    </div>
  );
};

export default Landing;
