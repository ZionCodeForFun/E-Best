import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Error from "./common/Error";
import ScrollToTop from "./common/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrackerPage from "./pages/home/TrackerPage";
import CarPage from "./pages/home/CarPage";
import CarDetailsPage from "./pages/home/CarDetails";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Landing />} />
        <Route path="/tracker-page" element={<TrackerPage />} />
        <Route path="/car-page" element={<CarPage />} />
        <Route path="/cars/:carId" element={<CarDetailsPage />} />

      </Routes>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default App;
