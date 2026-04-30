import "./Cards.css";
import Refresh from "../../assets/svg/Refresh";
import Arrow from "../../assets/svg/Arrow";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 8;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
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
          <span key={idx} className="page-dots">
            ...
          </span>
        ) : (
          <button
            key={page}
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
  const navigate = useNavigate();

  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [hospital, setHospital] = useState("");
  const [department, setDepartment] = useState("");
  const [dayWise, setDayWise] = useState("");

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [search, location, hospital, department, dayWise]);

  const fetchAllDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setAllDoctors(res.data);
      setFilteredDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors", {
        params: {
          search: search || undefined,
          location: location || undefined,
          hospital: hospital || undefined,
          department: department || undefined,
          day: dayWise || undefined,
        },
      });
      setFilteredDoctors(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setHospital("");
    setDepartment("");
    setDayWise("");
  };

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="cards-section section-space side-space">
      <div className="row align-items-center top-bar">
        <div className="col-lg-5 col-12 left-top">
          <p className="search-head">
            Home / <span>Doctors</span>
          </p>

          <div className="search-row">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <p className="records">Records : {filteredDoctors.length}</p>
          </div>
        </div>

        <div className="col-lg-7 col-12 right-top d-flex justify-content-lg-end flex-wrap dropdown">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Location</option>
            {[...new Set(allDoctors.map((d) => d.location).filter(Boolean))].map(
              (item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

          <select
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          >
            <option value="">Hospital</option>
            {[...new Set(allDoctors.map((d) => d.hospital).filter(Boolean))].map(
              (item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

          <select className="dept-dropdown"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Department</option>
            {[...new Set(allDoctors.map((d) => d.department).filter(Boolean))].map(
              (item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

          <select value={dayWise} onChange={(e) => setDayWise(e.target.value)}>
            <option value="">Day Wise</option>
            {[...new Set(allDoctors.map((d) => d.day).filter(Boolean))].map(
              (item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

          <div onClick={resetFilters} style={{ cursor: "pointer" }}>
            <Refresh className="svg-icon" />
          </div>
        </div>
      </div>

      <div className="doctor-grid">
        {paginatedDoctors.map((doc) => (
          <div className="doctor-cards" key={doc.id}>
            <div className="card-top">
              <img
                src={`http://localhost:5000/uploads/${doc.dr_image}`}
                alt={doc.dr_title}
                className="doc-img"
              />

              <div className="doc-info ">
                <h3 className="doc-name">{doc.dr_title}</h3>

                <p className="doc-speciality">{doc.department}</p>

{Number(doc.dr_exp) > 0 && (
  <p className="doc-exp">
    <strong>{doc.dr_exp} Years</strong>
  </p>
)}

              </div>
            </div>

            <div className="card-actions">
              <div className="action-row">
                <button
  className="btn-view"
  onClick={() => navigate(`/certaincard/${doc.id}`)}
>
  View Now <span><Arrow /></span>
</button>

                <button className="btn-book">Book Now</button>
              </div>

              <button className="btn-callback">Call Back</button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default Cards;