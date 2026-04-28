import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const title =
    location.pathname === "/dashboard"
      ? "Dashboard"
      : location.pathname === "/doctors"
      ? "Doctors Management"
      : "Admin Panel";

  return (
    <div className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <span className="admin-badge">Admin</span>
    </div>
  );
}

export default Header;