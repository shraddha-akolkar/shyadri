// import React from "react";
import Navbar from "../../Pages/Header/Navbar";
import Footer from "../../Pages/Footer/Footer";
import img1 from "../../assets/imgs/dr1.webp";
import "./CertainCard.css";
import Bag from "../../assets/svg/Bag";
import Phone from "../../assets/svg/Phone";
import ContactBag from "../../assets/svg/ContactBag"
const CertainCard = () => {
  return (
    <div>
      <Navbar />

      <div className="side-space section-space main-card">
        <div className="card shadow-sm  doctor-card">
          <div className="row  ">


            <div className="col-md-8 d-flex align-items-center">
              <img
                src={img1}
                alt="Doctor"
                className="doctor-img me-4"
              />

              <div className="doctor-left-info">
                <h3 className="fw-bold">Dr. Abhijeet Botre</h3>
                <p className="mb-1">• Consultant</p>
                <p className="mb-2">
                  • MBBS, DCH, DNB (Paediatric Neurology & Epilepsy)
                </p>

                <p className="experience">
                  <span className="icon"><Bag /></span> 13 Years
                </p>

                <button className="btn btn-outline-danger px-4">
                  Call Back
                </button>
              </div>
            </div>


            <div className="col-md-4 d-flex align-items-center">
              <div className="info-box p-4 w-100">
                <h6 className="fw-bold">DEPARTMENT</h6>
                <p>Paediatrics, Neurology</p>

                <h6 className="fw-bold mt-1">CONTACT</h6>
                <p className="contact">
                  <span className="icon"><Phone /></span> 918888822222
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="side-space section-space">
  <div className="row">


    <div className="col-md-8">

    
      <h4 className="certain-card-title">Available At & OPD Timings</h4>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-card">Deccan Gymkhana</button>
        <button className="btn">Hadapsar</button>
      </div>

    
   <div className="opd-table">
  <table className="table text-center mb-0">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th className="active-day">Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

     
      <h4 className="certain-card-title mt-4">About Doctor</h4>

      <p className="about-text">
        Dr. Abhijit Bothre is well known Paediatric Neurologist in Pune who comes
        with 13 years of experience in Paediatric Neurology. He has handled
        numerous complex medical cases and is known for attention to detail,
        accurate diagnosis and treating patients with empathy...
      </p>
    </div>

  
    <div className="col-md-4">
      <div className="callback-card p-4">

        <div className="icon-circle mb-3">
          <ContactBag/>
        </div>

        <h5 className="fw-bold mb-3 text-center">REQUEST A CALL BACK.</h5>

        <select className="form-control-card mb-2">
          <option>Pune</option>
        </select>

        <select className="form-control-card mb-2">
          <option>Deccan Gymkhana</option>
        </select>

        <input
          type="text"
          className="form-control-card mb-2"
          placeholder="Your Full Name*"
        />

        <input
          type="text"
          className="form-control-card mb-2"
          placeholder="Mobile Number*"
        />

        <div className="d-flex gap-2 mb-2">
          <input type="date" className="form-control-card" />
          <select className="form-control-card">
            <option>Select Slot</option>
          </select>
        </div>

        <textarea
          className="form-control-card mb-3"
          placeholder="Any Message"
        ></textarea>

        <button className="btn btn-card w-100">
          Book Now And Pay Later
        </button>
      </div>
    </div>

  </div>
</div>

      <Footer />
    </div>
  );
};

export default CertainCard;