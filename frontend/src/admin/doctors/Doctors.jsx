import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Doctors.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    dr_title: "",
    dr_role: "",
    dr_subtitle: "",
    dr_exp: "",
    department: "",
    contact: "",
    dr_desc: "",
    dr_image: "",
  });

  // FETCH DATA
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/doctors");
    setDoctors(res.data);
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE CHANGE
  const handleImage = (e) => {
    setForm({ ...form, dr_image: e.target.files[0] });
  };

  // RESET FORM
const resetForm = () => {
  setForm({
    dr_title: "",
    dr_role: "",
    dr_subtitle: "",
    dr_exp: "",
    department: "",
    contact: "",
    dr_desc: "",
    dr_image: "",
  });
  setEditId(null);

  // Clear Quill
  if (quillInstance.current) {
    quillInstance.current.setText("");
  }

  // ✅ Clear file input
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("dr_title", form.dr_title);
    data.append("dr_role", form.dr_role);
    data.append("dr_subtitle", form.dr_subtitle);
    data.append("dr_exp", form.dr_exp);
    data.append("department", form.department);
    data.append("contact", form.contact);
    data.append("dr_desc", form.dr_desc);

    // ✅ ONLY send image if new file selected
    if (form.dr_image instanceof File) {
      data.append("dr_image", form.dr_image);
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/doctors/${editId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/doctors",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
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
      dr_role: doc.dr_role,
      dr_subtitle: doc.dr_subtitle,
      dr_exp: doc.dr_exp,
      department: doc.department,
      contact: doc.contact,
      dr_desc: doc.dr_desc,
      dr_image: doc.dr_image, // string for preview
    });

    window.scrollTo(0, 0);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete doctor?")) {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      fetchDoctors();
    }
  };

  // QUILL EDITOR
  const fileInputRef = useRef(null);

  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Description",
      });

      quillInstance.current.on("text-change", () => {
        setForm((prev) => ({
          ...prev,
          dr_desc: quillInstance.current.root.innerHTML,
        }));
      });
    }
  }, []);

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = form.dr_desc || "";
    }
  }, [editId]);

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
                  name="dr_role"
                  className="form-control"
                  placeholder="Role (Consultant, Surgeon...)"
                  value={form.dr_role}
                  onChange={handleChange}
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

              <div className="col-md-6">
                <input
                  name="dr_exp"
                  type="number"
                  className="form-control"
                  placeholder="Experience"
                  value={form.dr_exp}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="department"
                  className="form-control"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  name="contact"
                  className="form-control"
                  placeholder="Contact"
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <div ref={quillRef} style={{ background: "#fff", minHeight: "150px" }} />
              </div>

              {/* <div className="col-12 pt-3">
  <label className="form-label">Doctor Image</label>

  <input
    type="file"
    name="dr_image"
    className="form-control"
    accept="image/*"
    onChange={handleImage}
  />
</div> */}
  <div className="col-12">
               <input
  type="file"
  name="dr_image"
  className="form-control mt-lg-5"
  accept="image/*"
  onChange={handleImage}
  ref={fileInputRef}  // ✅ add this
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
      <div className="table-card">
        <div className="table-card-header">
          <h6>Doctors List</h6>
          <span>{doctors.length} Records</span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
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

                  <td>
                    <img
                      src={
                        doc.dr_image
                          ? `http://localhost:5000/uploads/${doc.dr_image}`
                          : "https://via.placeholder.com/60"
                      }
                      style={{ width: 60, height: 60, borderRadius: 8 }}
                    />
                  </td>

                  <td>{doc.dr_title || "-"}</td>
                  <td>{doc.dr_role || "-"}</td>
                  <td>{doc.dr_subtitle || "-"}</td>
                  <td>{doc.dr_exp ? `${doc.dr_exp} yrs` : "-"}</td>
                  <td>{doc.department || "-"}</td>
                  <td>{doc.contact || "-"}</td>

                  <td>
                    {doc.dr_desc
                      ? doc.dr_desc.replace(/<[^>]+>/g, "").substring(0, 40) + "..."
                      : "-"}
                  </td>

                  <td>
  <div className="d-flex gap-2 flex-nowrap">
    <button
      className="btn btn-warning btn-sm"
      onClick={() => handleEdit(doc)}
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
                <tr>
                  <td colSpan="10" className="text-center">
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