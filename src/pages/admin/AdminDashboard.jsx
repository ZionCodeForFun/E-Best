import { useEffect, useState } from "react";
import { superbase } from "../../SuperbaseClient";
import "./adminStyles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    cars: 0,
    trackers: 0,
    accessories: 0,
  });

  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);

    const [{ count: cars }, { count: trackers }, { count: accessories }] =
      await Promise.all([
        superbase.from("cars").select("*", { count: "exact", head: true }),

        superbase.from("trackers_plans").select("*", { count: "exact", head: true }),

        superbase
          .from("accessories")
          .select("*", { count: "exact", head: true }),
      ]);

    setStats({
      cars: cars || 0,
      trackers: trackers || 0,
      accessories: accessories || 0,
    });

    setLoading(false);
  };

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="admin-dashboard__header">
        <h1>Welcome, Admin</h1>
        <p>Manage cars, trackers and accessories from here.</p>
      </div>

      {/* STATS */}
      <div className="admin-dashboard__stats">
        <div className="admin-stat-card">
          <h3>Cars</h3>
          <span>{loading ? "—" : `${stats.cars} Listings`}</span>
        </div>

        <div className="admin-stat-card">
          <h3>Trackers</h3>
          <span>{loading ? "—" : `${stats.trackers} Plans`}</span>
        </div>

        <div className="admin-stat-card">
          <h3>Accessories</h3>
          <span>{loading ? "—" : `${stats.accessories} Items`}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="admin-actions-grid">
        <button className="admin-action-btn" onClick={() => nav("/admin/cars")}>
          Manage Cars
        </button>
        <button
          className="admin-action-btn"
          onClick={() => nav("/admin/trackers")}
        >
          Manage Tracker Plans
        </button>
        <button
          className="admin-action-btn"
          onClick={() => nav("/admin/accessories")}
        >
          Manage Accessories
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
