import logo from "../../assets/imgs/logo.webp";
import Call from "../../assets/svg/Call";
import Tel from "../../assets/svg/Tel";
import Wp from "../../assets/svg/Wp";
import Person from "../../assets/svg/Person";
import Search from "../../assets/svg/Search";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="main-navbar">
      <div className="top-navbar">
        <div className="row">
          
     
          <div className="col-lg-2 align-items-center top-left">
            <img src={logo} alt="logo" className="logo img-fluid" />
          </div>

       
          <div className="col-lg-10">

       
            <div className="row align-items-center top-bar-nav">

     
              <div className="col-lg-6 col-md-6">
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

         
              <div className="col-lg-4 col-md-4">
                <div className="d-flex align-items-center justify-content-center gap-1 contact-section">
                  <div>
                    <Call />
                  </div>
                  <div>
                    <Wp />
                  </div>
                  <div>
                    <Tel />
                  </div>

                  <div className="phone-text">
                    <small>For Appointment</small>
                    <div className="number">+91 88888 22222</div>
                  </div>
                </div>
              </div>

        
              <div className="col-lg-2 col-md-2 d-flex justify-content-end">
                <button className="login-btn d-flex align-items-center">
                  <Person /> Login
                </button>
              </div>

            </div>

        
<div className="bottom-navbar d-flex align-items-center justify-content-between">

 

<ul className="menu-list d-flex align-items-center mb-0">


  <li>
    <select className="menu-nav">
      <option>Hospitals</option>
      <option>City Hospital</option>
      <option>Apollo Hospital</option>
      <option>Care Hospital</option>
    </select>
  </li>


  <li>
    <select className="menu-nav">
      <option>Specialities</option>
      <option>Cardiology</option>
      <option>Neurology</option>
      <option>Orthopedic</option>
    </select>
  </li>


  <li>Health Packages</li>


  <li>
    <select className="menu-nav">
      <option>Blogs/Videos</option>
      <option>Blogs</option>
      <option>Videos</option>
    </select>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;