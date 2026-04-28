import "./Footer.css";
import logo from "../../assets/imgs/footer_logo.webp"
import footer_bottom from "../../assets/imgs/footer_bottom.png"
const Footer = () => {
  return (
    <section>
    <footer className="footer-section">
      <div className="container-fluid px-5">
        <div className="row gy-4">

       
          <div className="col-lg-3 col-md-6">
            <div className="footer-logo mb-4">
              <img src={logo} alt="logo" className="img-fluid" />
            </div>

            <div className="footer-contact">
              <div className="footer-item d-flex">
                <img src="/icons/company.png" alt="" className="icon" />
                <div>
                  <h6>Company name</h6>
                  <p>Sahyadri Hospitals, Private Limited</p>
                </div>
              </div>

              <div className="footer-item d-flex">
                <img src="/icons/phone.png" alt="" className="icon" />
                <div>
                  <h6>Emergency & Appointment</h6>
                  <p>+91 88888 22222</p>
                </div>
              </div>

              <div className="footer-item d-flex">
                <img src="../../assets/imgs/footer1" alt="" className="icon" />
                <div>
                  <h6>Email Us</h6>
                  <p>feedback.sahyadri@manipalhospitals.com</p>
                </div>
              </div>

              <div className="footer-item d-flex">
                <img src="/icons/location.png" alt="" className="icon" />
                <div>
                  <h6>Registered Office</h6>
                  <p>
                    S N. 89 & 90, Plot No. 54, Lokmanya Colony,
                    Kothrud, Pune 411038, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>

      
          <div className="col-lg-2 col-md-6">
            <h4 className="footer-title">Specialities</h4>
            <ul className="footer-links">
              <li>Cardiac Surgery</li>
              <li>Cardiology</li>
              <li>Gastroenterology</li>
              <li>General Surgery</li>
              <li>Neurology</li>
              <li>Neurosurgery</li>
              <li>Orthopaedics</li>
              <li>Urology</li>
            </ul>
          </div>


          <div className="col-lg-2 col-md-6">
            <h4 className="footer-title">Academics & Research</h4>
            <ul className="footer-links">
              <li>Academics</li>
              <li>Clinical Research</li>
              <li>Genetics</li>
            </ul>

            <h4 className="footer-title mt-4">Medical Procedures</h4>
            <ul className="footer-links">
              <li>ACL Reconstruction Surgery</li>
              <li>Laser Angioplasty</li>
              <li>Abdominal Surgery</li>
              <li>Joint Surgery</li>
            </ul>
          </div>

     
          <div className="col-lg-2 col-md-6">
            <h4 className="footer-title">Patient Care</h4>
            <ul className="footer-links">
              <li>Find A Doctor</li>
              <li>Book Appointment</li>
              <li>Medical Services</li>
              <li>Patient Testimonials</li>
              <li>Pay Online</li>
            </ul>

            <h4 className="footer-title mt-4">News & Media</h4>
            <ul className="footer-links">
              <li>News</li>
              <li>Interviews</li>
              <li>Our Videos</li>
            </ul>
          </div>

     
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Hospitals</h4>
            <ul className="footer-links">
              <li>Deccan, Pune</li>
              <li>Shivaji Nagar, Pune</li>
              <li>Hadapsar, Pune</li>
              <li>Nagar Road, Pune</li>
              <li>Kothrud, Pune</li>
              <li>Nashik</li>
            </ul>

            <h4 className="footer-title mt-4">Quick Links</h4>
            <ul className="footer-links">
              <li>About Sahyadri</li>
              <li>Contact Us</li>
              <li>Career</li>
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
            </ul>
          </div>

        </div>

<div className="footer-accreditation">
  <div className="accreditation-box">
    <p>
      NABH Accredited Multispecialty Health Care Hospitals Chain in Maharashtra
    </p>

    <img src={footer_bottom} alt="badge" className="badge-logo" />
  </div>
</div>


      </div>
      
    </footer>
    <div className="footer-bottom">
  <div className="footer-bottom-wrapper">

    <div className="copyright-text">
      Copyright 2026, All Rights Reserved with Sahyadri Hospitals, Pune
    </div>

    <div className="social-icons">
      <i className="bi bi-instagram"></i>
      <i className="bi bi-twitter-x"></i>
      <i className="bi bi-linkedin"></i>
      <i className="bi bi-facebook"></i>
      <i className="bi bi-youtube"></i>
    </div>

    <div className="footer-links-bottom">
      Privacy Policy | Medical Disclaimer
    </div>

  </div>
</div>
</section>
  );
};

export default Footer;