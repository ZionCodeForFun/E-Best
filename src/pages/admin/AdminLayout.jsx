import { useState } from "react";
import AdminSidebar from "../../components/admin/SideBar";
import AdminTopbar from "../../components/admin/Topbar";
import "./adminStyles/AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="admin-layout__main">
        <AdminTopbar onMenu={() => setSidebarOpen(true)} />
        <div className="admin-layout__content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
