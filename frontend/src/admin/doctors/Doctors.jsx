import { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css"
function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    dr_title: "",
    dr_subtitle: "",
    dr_exp: "",
    department: "",
    contact: "",
    dr_desc: "",
    dr_image: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/doctors");
    setDoctors(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, dr_image: e.target.files[0] });
  };

  const resetForm = () => {
    setForm({
      dr_title: "",
      dr_subtitle: "",
      dr_exp: "",
      department: "",
      contact: "",
      dr_desc: "",
      dr_image: "",
    });
    setEditId(null);
  };

  // ✅ CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    try {
      if (editId) {
        // ⚠️ IMPORTANT FIX
        await axios.put(
          `http://localhost:5000/api/doctors/${editId}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/doctors",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      fetchDoctors();
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (doc) => {
    setEditId(doc.id);

    setForm({
      dr_title: doc.dr_title,
      dr_subtitle: doc.dr_subtitle,
      dr_exp: doc.dr_exp,
      department: doc.department,
      contact: doc.contact,
      dr_desc: doc.dr_desc,
      dr_image: doc.dr_image,
    });

    window.scrollTo(0, 0);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete doctor?")) {
      await axios.delete(
        `http://localhost:5000/api/doctors/${id}`
      );
      fetchDoctors();
    }
  };

  return (
    <>
      {/* FORM */}
      <div className="table-card mb-4">
        <div className="table-card-header">
          <h6>{editId ? "Update Doctor" : "Add Doctor"}</h6>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  name="dr_title"
                  className="form-control"
                  placeholder="Doctor Name"
                  value={form.dr_title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  name="dr_subtitle"
                  className="form-control"
                  placeholder="Subtitle"
                  value={form.dr_subtitle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  name="dr_exp"
                  type="number"
                  className="form-control"
                  placeholder="Experience"
                  value={form.dr_exp}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  name="department"
                  className="form-control"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  name="contact"
                  className="form-control"
                  placeholder="Contact"
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <textarea
                  name="dr_desc"
                  className="form-control"
                  placeholder="Description"
                  value={form.dr_desc}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImage}
                />
              </div>

              {/* IMAGE PREVIEW */}
              {form.dr_image && (
                <div className="col-12">
                  <img
                    src={
                      typeof form.dr_image === "string"
                        ? `http://localhost:5000/uploads/${form.dr_image}`
                        : URL.createObjectURL(form.dr_image)
                    }
                    className="preview-img"
                    alt=""
                  />
                </div>
              )}

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-primary">
                  {editId ? "Update" : "Add"}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* TABLE */}
      {/* TABLE */}
<div className="table-card">
  <div className="table-card-header">
    <h6>Doctors List</h6>
    <span>{doctors.length} Records</span>
  </div>

  <div className="table-responsive">
    <table className="table  align-middle">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Subtitle</th>
          <th>Experience</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {doctors.map((doc) => (
          <tr key={doc.id}>
            <td>#{doc.id}</td>

            {/* IMAGE */}
            <td>
              <img
                src={
                  doc.dr_image
                    ? `http://localhost:5000/uploads/${doc.dr_image}`
                    : "https://via.placeholder.com/60"
                }
                alt="doctor"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </td>

            <td>{doc.dr_title}</td>

            <td>{doc.dr_subtitle || "-"}</td>

            <td>{doc.dr_exp ? `${doc.dr_exp} yrs` : "-"}</td>

            <td>
              <span >
                {doc.department || "-"}
              </span>
            </td>

            <td>{doc.contact || "-"}</td>

            {/* DESCRIPTION SHORT */}
            <td style={{ maxWidth: "200px" }}>
              {doc.dr_desc
                ? doc.dr_desc.substring(0, 40) + "..."
                : "-"}
            </td>

            {/* ACTION */}
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(doc)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(doc.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}

        {/* EMPTY STATE */}
        {doctors.length === 0 && (
          <tr>
            <td colSpan="9" className="text-center py-4">
              No Doctors Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </>
  );
}

export default Doctors;