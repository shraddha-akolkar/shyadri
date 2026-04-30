require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const doctorRoutes = require("./routes/drroutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/admin", adminRoutes);


sequelize.sync()
  .then(() => {
    console.log("DB updated & connected");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch(err => console.log("DB Error:", err));