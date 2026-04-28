import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"
function Dashboard() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Stats
  const totalDoctors = doctors.length;

  const totalDepartments = new Set(
    doctors.map((d) => d.department)
  ).size;

  const avgExperience = doctors.length
    ? Math.round(
        doctors.reduce((sum, d) => sum + Number(d.dr_exp || 0), 0) /
          doctors.length
      )
    : 0;

  const deptColor = (dept) => {
    const map = {
      Cardiology: "blue",
      Neurology: "red",
      Orthopedics: "navy",
      Pediatrics: "blue",
      Dermatology: "red",
    };
    return map[dept] || "blue";
  };

  return (
    <>
      {/* STATS */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-label">Total Doctors</div>
            <div className="stat-value">{totalDoctors}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-label">Departments</div>
            <div className="stat-value">{totalDepartments}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-label">Avg Experience</div>
            <div className="stat-value">{avgExperience} yrs</div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <div className="table-card-header">
          <h6>Doctors List</h6>
          <span>Showing {doctors.length} records</span>
        </div>

        <table className="doctors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Experience</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td className="id-cell">#{doc.id}</td>

                <td>
                  <strong>{doc.dr_title}</strong>
                </td>

                <td>
                  <span className={`dept-badge ${deptColor(doc.department)}`}>
                    {doc.department}
                  </span>
                </td>

                <td>
                  <div className="exp-bar-wrap">
                    <div className="exp-bar">
                      <div
                        className="exp-bar-fill"
                        style={{
                          width: `${Math.min(doc.dr_exp * 5, 100)}%`,
                        }}
                      />
                    </div>
                    <span>{doc.dr_exp} yrs</span>
                  </div>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;