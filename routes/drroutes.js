const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/drcontroller");
const upload = require("../middleware/upload");


router.post("/", upload.single("dr_image"), doctorController.createDoctor);

router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
router.put("/:id", upload.single("dr_image"), doctorController.updateDoctor);router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;