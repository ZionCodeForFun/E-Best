import React from "react";
import "../style/header.css";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <div className="header-container">
      <article className="header-wrapper">
        <aside className="header-left">
          <img src={logo} alt="logo" />
        </aside>
        <aside className="header-right">
          <nav className="nav-holder">
            <p data-text="Home">Home</p>
            <p data-text="About Us">About Us</p>
            <p data-text="Service">Service</p>
            <p data-text="Contact Us">Contact Us</p>
          </nav>
        </aside>
      </article>
    </div>
  );
};

export default Header;
