import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../admin/doctors/Doctors";

const emptyForm = {
  dr_title: "", dr_role: "", dr_subtitle: "", dr_exp: "",
  department: "", contact: "", dr_desc: "", dr_image: "",
  location: "", hospital: "", day: "",
};

function DoctorAdd() {
  const { id } = useParams();       
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const fileInputRef    = useRef(null);
  const quillRef        = useRef(null);
  const quillInstance   = useRef(null);


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
    if (isEdit) {
      axios.get(`http://localhost:5000/api/doctors/${id}`).then((res) => {
        const doc = res.data;
        setForm({
          dr_title:    doc.dr_title    || "",
          dr_role:     doc.dr_role     || "",
          dr_subtitle: doc.dr_subtitle || "",
          dr_exp:      doc.dr_exp      || "",
          department:  doc.department  || "",
          contact:     doc.contact     || "",
          dr_desc:     doc.dr_desc     || "",
          dr_image:    doc.dr_image    || "",
          location:    doc.location    || "",
          hospital:    doc.hospital    || "",
          day:         doc.day         || "",
        });
        if (quillInstance.current) {
          quillInstance.current.root.innerHTML = doc.dr_desc || "";
        }
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage  = (e) => setForm({ ...form, dr_image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("dr_title",    form.dr_title);
    data.append("dr_role",     form.dr_role);
    data.append("dr_subtitle", form.dr_subtitle);
    data.append("dr_exp",      form.dr_exp);
    data.append("department",  form.department);
    data.append("contact",     form.contact);
    data.append("dr_desc",     form.dr_desc);
    data.append("location",    form.location);
    data.append("hospital",    form.hospital);
    data.append("day",         form.day);
    if (form.dr_image instanceof File) data.append("dr_image", form.dr_image);

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/doctors/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/api/doctors", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/doctors"); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table-card doctor-form-card mb-4">
      <div className="table-card-header">
        <h6>{isEdit ? "Update Doctor" : "Add Doctor"}</h6>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <input name="dr_title" className="form-control" placeholder="Doctor Name"
                value={form.dr_title} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <input name="dr_role" className="form-control" placeholder="Role (Consultant, Surgeon...)"
                value={form.dr_role} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <input name="dr_subtitle" className="form-control" placeholder="Subtitle"
                value={form.dr_subtitle} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <input name="dr_exp" type="number" className="form-control" placeholder="Experience"
                value={form.dr_exp} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <input name="department" className="form-control" placeholder="Department"
                value={form.department} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <input name="contact" className="form-control" placeholder="Contact"
                value={form.contact} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <input name="location" className="form-control" placeholder="Location"
                value={form.location} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <input name="hospital" className="form-control" placeholder="Hospital"
                value={form.hospital} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <input name="day" className="form-control" placeholder="Day (Mon-Fri)"
                value={form.day} onChange={handleChange} />
            </div>

            <div className="col-12">
              <div ref={quillRef} style={{ background: "#fff", minHeight: "150px" }} />
            </div>

            <div className="col-12">
              <input type="file" name="dr_image" className="form-control mt-lg-5"
                accept="image/*" onChange={handleImage} ref={fileInputRef} />
            </div>

            {form.dr_image && (
              <div className="col-12">
                <img
                  src={typeof form.dr_image === "string"
                    ? `http://localhost:5000/uploads/${form.dr_image}`
                    : URL.createObjectURL(form.dr_image)}
                  className="preview-img" alt=""
                />
              </div>
            )}

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary">
                {isEdit ? "Update" : "Add"}
              </button>
              <button type="button" className="btn btn-secondary"
                onClick={() => navigate("/doctors")}   
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorAdd;