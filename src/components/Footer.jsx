import "../style/footer.css";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const nav = useNavigate();
  return (
    <footer className="footer-container">
      {/* Top CTA */}
      <div className="footer-cta">
        <h3>Drive Smart. Track Your Vehicle. Anywhere.</h3>
        <button className="btn-red" onClick={() => nav("/car-page")}>
          View Cars
        </button>
      </div>

      <hr className="footer-divider" />

      {/* Middle Columns */}
      <div className="footer-main">
        <div className="footer-col about">
          <div className="logo-placeholder">
            <img src={logo} alt="logo" />
          </div>
          <p>
            E-BEST provides premium car sales, trade-in, and GPS tracker
            installation services across Nigeria.
          </p>
        </div>

        <div className="footer-col links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a onClick={() => nav("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => nav("/car-page")}>Cars for Sale</a>
            </li>
            <li>
              <a onClick={() => nav("/tracker-page")}>GPS Trackers</a>
            </li>
            <li>
              <a onClick={() => nav("/service")}>Services</a>
            </li>
          </ul>
        </div>

        <div className="footer-col contact">
          <h4>Contact Us</h4>
          <p>
            Euro 65,former Julius Berger compound, Berger yard bus stop Lagos,
            Nigeria
          </p>
          <p>+234 8133369509</p>
          <div className="social-icons">
            <a>
              <FaFacebook />
            </a>{" "}
            <a>
              <FaInstagram />
            </a>{" "}
            <a>
              <MdEmail />
            </a>
            <a>
              <BsWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 E-BEST. All Rights Reserved.</p>
        <div className="legal-links">
          <a>Privacy Policy</a>
          <a> Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
