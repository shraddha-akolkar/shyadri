const express = require("express");
const cors = require("cors");

const app = express();

const doctorRoutes = require("./routes/drroutes");
const adminRoutes = require("./routes/adminRoutes");


app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;