import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Error from "./common/Error";
import ScrollToTop from "./common/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default App;
