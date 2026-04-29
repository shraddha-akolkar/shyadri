import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Pages/Header/Navbar";
import Footer from "../../Pages/Footer/Footer";
import "./CertainCard.css";
import Bag from "../../assets/svg/Bag";
import Phone from "../../assets/svg/Phone";
import ContactBag from "../../assets/svg/ContactBag";
import "quill/dist/quill.snow.css";
const CertainCard = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!doctor) return <div className="text-center mt-5">Doctor not found.</div>;

  return (
    <div>
      <Navbar />

      <div className="side-space section-space main-card">
        <div className="card shadow-sm doctor-card">
          <div className="row">

            <div className="col-md-8 d-flex align-items-center">
              <img
  src={
    doctor.dr_image
      ? `http://localhost:5000/uploads/${doctor.dr_image}`
      : "/default-doctor.png"
  }
  alt={doctor.dr_title}
  className="doctor-img me-4"
/>

              <div className="doctor-left-info">
  <h3 className="fw-bold">{doctor.dr_title}</h3>

  {doctor.dr_role && (
    <p className="mb-1">• {doctor.dr_role}</p>
  )}

  {doctor.dr_subtitle && (
    <p className="mb-1">• {doctor.dr_subtitle}</p>
  )}

  {doctor.dr_exp && Number(doctor.dr_exp) > 0 && (
    <p className="experience">
      <span className="icon"><Bag /></span> {doctor.dr_exp} Years
    </p>
  )}

  <button className="btn btn-outline-danger px-4">
    Call Back
  </button>
</div>
            </div>

            <div className="col-md-4 d-flex align-items-center">
              <div className="info-box p-4 w-100">

  {doctor.department && (
    <>
      <h6 className="fw-bold">DEPARTMENT</h6>
      <p>{doctor.department}</p>
    </>
  )}

  {doctor.contact && (
    <>
      <h6 className="fw-bold mt-1">CONTACT</h6>
      <p className="contact">
        <span className="icon"><Phone /></span> {doctor.contact}
      </p>
    </>
  )}

</div>
            </div>

          </div>
        </div>
      </div>

      <div className="side-space section-space">
        <div className="row">

          <div className="col-md-8">
  <h4 className="certain-card-title">About Doctor</h4>
  <div
    className="ql-editor"
    dangerouslySetInnerHTML={{ __html: doctor.dr_desc }}
  />
</div>

          <div className="col-md-4">
            <div className="callback-card p-4">

              <div className="icon-circle mb-3">
                <ContactBag />
              </div>

              <h5 className="fw-bold mb-3 text-center">REQUEST A CALL BACK.</h5>

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