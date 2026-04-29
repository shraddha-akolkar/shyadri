const Doctor = require("../models/dr");

// CREATE
exports.createDoctor = async (req, res) => {
  try {
    const {
      dr_title,
      dr_role,
      dr_subtitle,
      dr_exp,
      department,
      contact,
      dr_desc,
    } = req.body;

    if (!dr_title) {
      return res.status(400).json({ message: "Doctor name is required" });
    }

    const image = req.file ? req.file.filename : null;

    const doctor = await Doctor.create({
      dr_title,
        dr_role: dr_role || null, 
      dr_subtitle: dr_subtitle || null,
      dr_exp: dr_exp && Number(dr_exp) > 0 ? dr_exp : null,
      department: department || null,
      contact: contact || null,
      dr_desc: dr_desc || null,
      dr_image: image,
    });

    res.status(201).json({ message: "Doctor created", doctor });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const image = req.file ? req.file.filename : doctor.dr_image;

    await doctor.update({
      dr_title: req.body.dr_title || doctor.dr_title,
       dr_role: req.body.dr_role || null, 
      dr_subtitle: req.body.dr_subtitle || null,
      dr_exp: req.body.dr_exp && Number(req.body.dr_exp) > 0 ? req.body.dr_exp : null,
      department: req.body.department || null,
      contact: req.body.contact || null,
      dr_desc: req.body.dr_desc || null,
      dr_image: image,
    });

    res.json({ message: "Doctor updated", doctor });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.destroy();

    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};