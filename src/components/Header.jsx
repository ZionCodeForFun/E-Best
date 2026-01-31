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
            <p data-text="Home">Home</p>
            <p data-text="About Us">About Us</p>
            <p data-text="Service">Service</p>
            <p data-text="Contact Us">Contact Us</p>
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
          <p onClick={() => setMenuOpen(false)}>Home</p>
          <p onClick={() => setMenuOpen(false)}>About Us</p>
          <p onClick={() => setMenuOpen(false)}>Service</p>
          <p onClick={() => setMenuOpen(false)}>Contact Us</p>
        </nav>
      </div>
    </div>
  );
};

export default Header;
