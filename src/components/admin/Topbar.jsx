import { superbase } from "../../SuperbaseClient";
import { useNavigate } from "react-router-dom";
import "../../pages/admin/adminStyles/topBar.css";

const AdminTopbar = ({ onMenu }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await superbase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="admin-topbar">
      {/* Hamburger menu for mobile */}
      <button className="admin-topbar__menu-btn" onClick={onMenu}>
        ☰
      </button>

      <h1 className="admin-topbar__title">E-BEST</h1>

      <button className="admin-topbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminTopbar;
