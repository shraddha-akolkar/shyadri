const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // ✅ THIS WAS MISSING

const Doctor = sequelize.define("Doctor", {
  dr_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  dr_role: {   // ✅ ADD ROLE HERE
    type: DataTypes.STRING,
  },

  dr_subtitle: {
    type: DataTypes.STRING,
  },

  dr_exp: {
    type: DataTypes.INTEGER,
  },

  department: {
    type: DataTypes.STRING,
  },

  contact: {
    type: DataTypes.STRING,
  },

  dr_desc: {
    type: DataTypes.TEXT,
  },

  dr_image: {
    type: DataTypes.STRING,
  }
});

module.exports = Doctor;