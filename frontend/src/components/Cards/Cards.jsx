import "./Cards.css";
import Refresh from "../../assets/svg/Refresh";
import Arrow from "../../assets/svg/Arrow";
import dr1 from "../../assets/imgs/dr1.webp";
import { useState } from "react";

const doctors = [
  { id: 1, name: "aDr. Abhay Kulkarni", speciality: "Orthopaedics", experience: "20 Years", image: dr1 },
  { id: 2, name: "bDr. Abhay Somani", speciality: "Cardiology", experience: null, image: dr1 },
  { id: 3, name: "cDr. Abhay Sukhatme", speciality: "Orthopaedics", experience: null, image: dr1 },
  { id: 4, name: "dDr. Abhijeet", speciality: "Paediatrics, Neurology", experience: "13 Years", image: dr1 },
{ id: 5, name: "eDr. Abhay Kulkarni", speciality: "Orthopaedics", experience: "20 Years", image: dr1 },
  { id: 6, name: "fDr. Abhay Somani", speciality: "Cardiology", experience: null, image: dr1 },
  { id: 7, name: "gDr. Abhay Sukhatme", speciality: "Orthopaedics", experience: null, image: dr1 },
  { id: 8, name: "hDr. Abhijeet Botre", speciality: "Paediatrics, Neurology", experience: "13 Years", image: dr1 },
{ id: 9, name: "iDr. Abhay Kulkarni", speciality: "Orthopaedics", experience: "20 Years", image: dr1 },
  { id: 10, name: "Dr. Abhay Somani", speciality: "Cardiology", experience: null, image: dr1 },
  { id: 11, name: "jDr. Abhay Sukhatme", speciality: "Orthopaedics", experience: null, image: dr1 },
  { id: 12, name: "Dr. Abhijeet Botre", speciality: "Paediatrics, Neurology", experience: "13 Years", image: dr1 },
{ id: 13, name: "kDr. Abhay Kulkarni", speciality: "Orthopaedics", experience: "20 Years", image: dr1 },
  { id: 14, name: "kDr. Abhay Somani", speciality: "Cardiology", experience: null, image: dr1 },
  { id: 15, name: "gDr. Abhay Sukhatme", speciality: "Orthopaedics", experience: null, image: dr1 },
  { id: 16, name: "sDr. Abhijeet Botre", speciality: "Paediatrics, Neurology", experience: "13 Years", image: dr1 },

];

const ITEMS_PER_PAGE = 8; 
const TOTAL_PAGES = 15;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {

    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="page-dots">...</span>
        ) : (
          <button
            key={`page-${page}`}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE) || TOTAL_PAGES;
  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="cards-section section-space side-space">

      <div className="row align-items-center top-bar">
        <div className="col-lg-6 col-12 left-top">
          <p className="search-head">Home / <span>Doctors</span></p>
          <div className="search-row">
            <div className="search-box">
              <input type="text" placeholder="Search here" />
              <svg width="18" height="18" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="#333" strokeWidth="2" fill="none"/>
                <line x1="16" y1="16" x2="22" y2="22" stroke="#333" strokeWidth="2"/>
              </svg>
            </div>
            <p className="records">Records : 451</p>
          </div>
        </div>

        <div className="col-lg-6 col-12 right-top d-flex justify-content-lg-end flex-wrap">
          <select><option>Location</option></select>
          <select><option>Hospital</option></select>
          <select><option>Department</option></select>
          <select><option>Day Wise</option></select>
          <Refresh className="svg-icon" />
        </div>
      </div>

      <div className="doctor-grid">
        {paginatedDoctors.map((doc, index) => (
          <div className="doctor-card" key={`${doc.id}-${index}`}>
            <div className="card-top">
              <img src={doc.image} alt={doc.name} className="doc-img" />
              <div className="doc-info">
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-speciality">{doc.speciality}</p>
                {doc.experience && (
                  <p className="doc-exp"><strong>{doc.experience}</strong></p>
                )}
              </div>
            </div>
            <div className="card-actions">
              <div className="action-row">
                <button className="btn-view">  View Now <span><Arrow /></span></button>
               
                <button className="btn-book">Book Now</button>
              </div>
              <button className="btn-callback">Call Back</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </section>
  );
};

export default Cards;