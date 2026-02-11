import React, { useState } from "react";
import "../style/header.css";
import logo from "../assets/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  return (
    <div className="header-container">
      <article className="header-wrapper">
        <aside className="header-left">
          <img onClick={() => nav("/")} src={logo} alt="logo" />
        </aside>

        <aside className="header-right">
          <nav className="nav-holder">
            <p data-text="Home" onClick={() => nav("/")}>
              Home
            </p>
            <p data-text="About Us" onClick={() => nav("/about")}>
              About Us
            </p>
            <p data-text="Cars" onClick={() => nav("/car-page")}>
              Cars
            </p>
            <p data-text="Trackers" onClick={() => nav("/tracker-page")}>
              Trackers
            </p>
            <p data-text="Accessories" onClick={() => nav("/car-accessories")}>
              Accessories
            </p>
            <p data-text="Service" onClick={() => nav("/service")}>
              Service
            </p>
            <p data-text="Service" onClick={() => nav("/pricing")}>
              Pricing
            </p>
            <p data-text="Contact Us" onClick={() => nav("/contact")}>
              Contact Us
            </p>
          </nav>

          <div className="mobile-menu-icon" onClick={() => setMenuOpen(true)}>
            <HiOutlineMenuAlt3 size={28} />
          </div>
        </aside>
      </article>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <IoMdClose
            size={28}
            className="close-icon"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <nav className="mobile-nav">
          <p onClick={() =>{ nav("/"); setMenuOpen(false)}}>Home</p>
          <p onClick={() =>{nav("/about"); setMenuOpen(false)}}>About Us</p>
          <p onClick={() =>{nav("/car-page"); setMenuOpen(false)}}>Cars</p>
          <p onClick={() =>{nav("/tracker-page"); setMenuOpen(false)}}>Trackers</p>
          <p onClick={() =>{nav("/car-accessories"); setMenuOpen(false)}}>Car Accessories</p>
          <p onClick={() =>{ nav("/service");setMenuOpen(false)}}>Service</p>
          <p onClick={() =>{ nav("/pricing");setMenuOpen(false)}}>Pricing</p>
          <p onClick={() => {nav("/contact");setMenuOpen(false)}}>Contact Us</p>
        </nav>
      </div>
    </div>
  );
};

export default Header;
