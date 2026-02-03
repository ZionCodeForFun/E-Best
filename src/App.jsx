import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/home/Landing";
import { NotFound } from "./common/Error";
import ScrollToTop from "./common/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrackerPage from "./pages/home/TrackerPage";
import CarPage from "./pages/home/CarPage";
import CarDetailsPage from "./pages/home/CarDetails";
import Services from "./pages/ServicePage";
import Pricing from "./pages/home/Pricing";
import About from "./pages/home/About";
import ContactPage from "./pages/contact/Contactpage";
import Layout from "./components/Layout";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Layout />} >
        <Route path="/" element={<Landing />} />
        <Route path="/tracker-page" element={<TrackerPage />} />
        <Route path="/car-page" element={<CarPage />} />
        <Route path="/service" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage/>} />

        <Route path="/cars/:carId" element={<CarDetailsPage />} />
          </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default App;
