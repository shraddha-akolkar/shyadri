const { Op, fn, col, where } = require("sequelize");
const Doctor = require("../models/dr");

// helper → clean empty values
const clean = (val) => {
  if (
    val === undefined ||
    val === null ||
    String(val).trim() === "" ||
    String(val).trim().toLowerCase() === "null"
  ) {
    return null;
  }
  return String(val).trim();
};


const cleanNumber = (val) => {
  if (
    val === undefined ||
    val === null ||
    String(val).trim() === "" ||
    String(val).trim().toLowerCase() === "null"
  ) {
    return null;
  }

  const num = Number(val);
  return num > 0 ? num : null;
};

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
      location,
      hospital,
      day,
    } = req.body;

    if (!clean(dr_title)) {
      return res.status(400).json({ message: "Doctor name is required" });
    }

    const image = req.file ? req.file.filename : null;

    const doctor = await Doctor.create({
      dr_title: clean(dr_title),
      dr_role: clean(dr_role),
      dr_subtitle: clean(dr_subtitle),
      dr_exp: cleanNumber(dr_exp),
      department: clean(department),
      contact: clean(contact),
      dr_desc: clean(dr_desc),
      dr_image: image,
      location: clean(location),
      hospital: clean(hospital),
      day: clean(day),
    });

    res.status(201).json({
      message: "Doctor created",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllDoctors = async (req, res) => {
  try {
    const { search, location, hospital, department, day } = req.query;
    const filters = [];

    const addContainsFilter = (field, value) => {
      if (!clean(value)) return;

      filters.push(
        where(fn("LOWER", col(field)), {
          [Op.like]: `%${clean(value).toLowerCase()}%`,
        })
      );
    };

    addContainsFilter("dr_title", search);
    addContainsFilter("location", location);
    addContainsFilter("hospital", hospital);
    addContainsFilter("department", department);
    addContainsFilter("day", day);

    const doctors = await Doctor.findAll({
      where: filters.length ? { [Op.and]: filters } : undefined,
      order: [["id", "ASC"]],
    });

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
      dr_title: clean(req.body.dr_title) || doctor.dr_title,
      dr_role: clean(req.body.dr_role),
      dr_subtitle: clean(req.body.dr_subtitle),
      dr_exp: cleanNumber(req.body.dr_exp),
      department: clean(req.body.department),
      contact: clean(req.body.contact),
      dr_desc: clean(req.body.dr_desc),
      dr_image: image,
      location: clean(req.body.location),
      hospital: clean(req.body.hospital),
      day: clean(req.body.day),
    });

    res.json({
      message: "Doctor updated",
      doctor,
    });
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