import { useState } from "react";
import logo from "../../assets/imgs/logo.webp";
import Call from "../../assets/svg/Call";
import Tel from "../../assets/svg/Tel";
import Wp from "../../assets/svg/Wp";
import Person from "../../assets/svg/Person";
import Search from "../../assets/svg/Search";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileItem, setOpenMobileItem] = useState(null);

  const handleMouseEnter = (name) => setOpenDropdown(name);
  const handleMouseLeave = () => setOpenDropdown(null);

  const toggleMobileItem = (name) => {
    setOpenMobileItem(openMobileItem === name ? null : name);
  };

  return (
    <div className="main-navbar">
      <div className="top-navbar">

        <div className="row align-items-center mx-0">

       
          <div className="col-lg-2 col-6 top-left">
            <img src={logo} alt="logo" className="logo img-fluid" />
          </div>

       
          <div className="col-lg-10 d-none d-lg-block">
            <div className="row align-items-center top-bar-nav">
              <div className="col-lg-6">
                <div className="top-search-box">
                  <input
                    type="text"
                    placeholder="Search doctor here"
                    className="form-control"
                  />
                  <span className="search-icon">
                    <Search />
                  </span>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="d-flex align-items-center justify-content-center gap-2 contact-section">
                  <Call />
                  <Wp />
                  <Tel />
                  <div className="phone-text">
                    <small>For Appointment</small>
                    <div className="number">+91 88888 22222</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 d-flex justify-content-end">
                <button className="login-btn d-flex align-items-center">
                  <Person /> Login
                </button>
              </div>
            </div>

            <div className="bottom-navbar d-flex align-items-center justify-content-between">
              <ul className="menu-list d-flex align-items-center mb-0">

                <li
                  className="dropdown-item-wrapper"
                  onMouseEnter={() => handleMouseEnter("specialities")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="menu-nav-label">
                    Specialities <span className="dropdown-arrow">▾</span>
                  </span>
                  {openDropdown === "specialities" && (
                    <ul className="dropdown-menu-custom">
                      <li>Cardiology</li>
                      <li>Neurology</li>
                      <li>Orthopedics</li>
                      <li>Oncology</li>
                    </ul>
                  )}
                </li>

                <li
                  className="dropdown-item-wrapper"
                  onMouseEnter={() => handleMouseEnter("hospitals")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="menu-nav-label">
                    Hospitals <span className="dropdown-arrow">▾</span>
                  </span>
                  {openDropdown === "hospitals" && (
                    <ul className="dropdown-menu-custom">
                      <li>City Hospital</li>
                      <li>General Hospital</li>
                      <li>Children's Hospital</li>
                      <li>Trauma Center</li>
                    </ul>
                  )}
                </li>

                <li>Health Packages</li>

                <li
                  className="dropdown-item-wrapper"
                  onMouseEnter={() => handleMouseEnter("blogs")}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="menu-nav-label">
                    Blogs/Video <span className="dropdown-arrow">▾</span>
                  </span>
                  {openDropdown === "blogs" && (
                    <ul className="dropdown-menu-custom">
                      <li>Health Blogs</li>
                      <li>Doctor Videos</li>
                      <li>Patient Stories</li>
                    </ul>
                  )}
                </li>

                <li>Labs</li>
                <li>International Patients</li>
                <li>Find A Doctor</li>
              </ul>

              <div className="d-flex align-items-center gap-2">
                <button className="home-btn">Home Care</button>
                <button className="book-btn">Book Appointment</button>
              </div>
            </div>
          </div>

         
          <div className="col-6 d-flex d-lg-none justify-content-end align-items-center gap-2 mobile-icons">
            <button className="login-btn mobile-login">
              <Person /> Login
            </button>
            <div className="mobile-circle">
              <Search />
            </div>
            <div className="mobile-circle red">
              <Call />
            </div>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <ul>
            <li onClick={() => toggleMobileItem("hospitals")}>
              <div className="mobile-menu-row">
                <span>Hospitals</span>
                <span className={`mobile-arrow ${openMobileItem === "hospitals" ? "open" : ""}`}>›</span>
              </div>
              {openMobileItem === "hospitals" && (
                <ul className="mobile-submenu">
                  <li>City Hospital</li>
                  <li>General Hospital</li>
                  <li>Children's Hospital</li>
                  <li>Trauma Center</li>
                </ul>
              )}
            </li>

            <li onClick={() => toggleMobileItem("specialities")}>
              <div className="mobile-menu-row">
                <span>Specialities</span>
                <span className={`mobile-arrow ${openMobileItem === "specialities" ? "open" : ""}`}>›</span>
              </div>
              {openMobileItem === "specialities" && (
                <ul className="mobile-submenu">
                  <li>Cardiology</li>
                  <li>Neurology</li>
                  <li>Orthopedics</li>
                  <li>Oncology</li>
                </ul>
              )}
            </li>

            <li>Health Packages</li>

            <li onClick={() => toggleMobileItem("blogs")}>
              <div className="mobile-menu-row">
                <span>Blogs/Videos</span>
                <span className={`mobile-arrow ${openMobileItem === "blogs" ? "open" : ""}`}>›</span>
              </div>
              {openMobileItem === "blogs" && (
                <ul className="mobile-submenu">
                  <li>Health Blogs</li>
                  <li>Doctor Videos</li>
                  <li>Patient Stories</li>
                </ul>
              )}
            </li>

            <li>Labs</li>
            <li>International Patients</li>
            <li>Find A Doctor</li>
          </ul>

          <button className="home-btn w-100 mt-2">Home Care</button>
          <button className="book-btn w-100 mt-2">Book Appointment</button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;