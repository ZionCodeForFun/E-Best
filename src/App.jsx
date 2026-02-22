import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/home/Landing";
import { NotFound } from "./common/Error";
import ScrollToTop from "./common/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrackerPage from "./pages/TrackerPage";
import CarPage from "./pages/CarPage";
import CarDetailsPage from "./pages/CarDetails";
import Services from "./pages/ServicePage";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import ContactPage from "./pages/contact/Contactpage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import LoginPage from "./pages/admin/auth/Login";
import ResetPassword from "./pages/admin/auth/ResetPassword";
import Accessories from "./pages/admin/Accessories";
import Trackers from "./pages/admin/Tracker";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Cars from "./pages/admin/Car";
import CarAccessPage from "./pages/CarAccessPage";
import AccessoryDetail from "./pages/CarAccessDetails";
import DealersAdmin from "./pages/admin/DealerAdmin";
import Trash from "./pages/admin/Trash";

const AppWrapper = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/reset-password";

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>{<AdminDashboard />}</AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Cars />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/accessories"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Accessories />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dealer-admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <DealersAdmin />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trackers"
          element={
            <ProtectedRoute>
              <AdminLayout>{<Trackers />}</AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trash"
          element={
            <ProtectedRoute>
              <AdminLayout>{<Trash />}</AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/tracker-page" element={<TrackerPage />} />
          <Route path="/car-page" element={<CarPage />} />
          <Route path="/car-accessories" element={<CarAccessPage />} />
          <Route
            path="/car-accessories/:accessoryId"
            element={<AccessoryDetail />}
          />
          <Route path="/service" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cars/:carId" element={<CarDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
      <ScrollToTop />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};

export default App;
