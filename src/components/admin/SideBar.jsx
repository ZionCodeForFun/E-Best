import { NavLink } from "react-router-dom";
import "../../pages/admin/adminStyles/sideBar.css";

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`admin-sidebar__overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>

      <aside className={`admin-sidebar ${isOpen ? "active" : ""}`}>
        <h2 className="admin-sidebar__logo">Admin</h2>

        <nav className="admin-sidebar__nav">
          <NavLink
            to="/admin"
            end
            className="admin-sidebar__link"
            onClick={onClose}
          >
            Home
          </NavLink>
          <NavLink
            to="/admin/cars"
            className="admin-sidebar__link"
            onClick={onClose}
          >
            Cars
          </NavLink>
          <NavLink
            to="/admin/trackers"
            className="admin-sidebar__link"
            onClick={onClose}
          >
            Trackers
          </NavLink>
          <NavLink
            to="/admin/accessories"
            className="admin-sidebar__link"
            onClick={onClose}
          >
            Accessories
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
