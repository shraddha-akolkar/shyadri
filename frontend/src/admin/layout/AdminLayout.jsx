import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar onLogout={handleLogout} />

      <div className="main-content">
        <Header />

        <div className="content-area">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;