import { NavLink } from "react-router-dom";

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h5>Sahyadri</h5>
        <p>Admin Panel</p>
      </div>

      <div className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item-link">
          Dashboard
        </NavLink>

        <NavLink to="/doctors" className="nav-item-link">
          Doctors
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;