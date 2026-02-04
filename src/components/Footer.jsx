import "../style/footer.css";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const nav = useNavigate();
  const handleWhatsApp = () => {
    window.open("https://wa.me/8133369509", "_blank");
  };
  const handlefaceBook = () => {
    window.open("https://www.facebook.com/share/17aaAP7Tis/", "_blank");
  };
  const handleInsta = () => {
    window.open("https://wa.me/8133369509", "_blank");
  };
  const handleEmaiL = () => {
    window.open("mailto:ebestglobalresourcesltd@gmail.com", "_blank");
  };

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
            <a
          onClick={handlefaceBook}
            >
              <FaFacebook />
            </a>{" "}
            <a>
              <FaInstagram />
            </a>{" "}
            <a onClick={handleEmaiL}>
              <MdEmail />
            </a>
            <a onClick={handleWhatsApp}>
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
