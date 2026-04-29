const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Doctor = sequelize.define("Doctor", {
  dr_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  dr_role: {
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
  },

 
  location: {
    type: DataTypes.STRING,
  },

  hospital: {
    type: DataTypes.STRING,
  },

  day: {
    type: DataTypes.STRING,
  }
});

module.exports = Doctor;