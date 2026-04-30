import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch  {
      // console.log(err);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    fetchDoctors();
  }, [fetchDoctors]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete doctor?")) {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      fetchDoctors();
    }
  };

  return (
    <div className="table-card doctors-list-card">
      <div className="table-card-header">
        <h6>Doctors List</h6>
        <div className="d-flex align-items-center gap-3">
          <span className="length">{doctors.length} Records</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/doctor/add")}  
          >
            + Add Doctor
          </button>
        </div>
      </div>

      <div className="doctor-scroll" role="region" aria-label="Doctors table horizontal scroll">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>ID</th><th>Image</th><th>Name</th><th>Role</th>
              <th>Subtitle</th><th>Experience</th><th>Department</th>
              <th>Contact</th><th>Location</th><th>Hospital</th>
              <th>Day</th><th>Description</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...doctors].sort((a, b) => a.id - b.id).map((doc) => (
              <tr key={doc.id}>
                <td>#{doc.id}</td>
                <td>
                  <img
                    src={doc.dr_image ? `http://localhost:5000/uploads/${doc.dr_image}` : "https://via.placeholder.com/60"}
                    className="table-img" alt=""
                  />
                </td>
                <td>{doc.dr_title || "-"}</td>
                <td className="role-cell" title={doc.dr_role || "-"}>{doc.dr_role || "-"}</td>
                <td className="subtitle-cell" title={doc.dr_subtitle || "-"}>{doc.dr_subtitle || "-"}</td>
                <td>{doc.dr_exp ? `${doc.dr_exp} yrs` : "-"}</td>
                <td>{doc.department || "-"}</td>
                <td>{doc.contact || "-"}</td>
                <td>{doc.location || "-"}</td>
                <td>{doc.hospital || "-"}</td>
                <td>{doc.day || "-"}</td>
                <td className="desc-cell">
                  {doc.dr_desc ? doc.dr_desc.replace(/<[^>]+>/g, "").substring(0, 40) + "..." : "-"}
                </td>
                <td>
                  <div className="d-flex gap-2 flex-nowrap">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/doctor/edit/${doc.id}`)} 
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(doc.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr><td colSpan="13" className="text-center">No Doctors Found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;