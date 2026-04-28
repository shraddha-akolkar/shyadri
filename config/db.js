const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sahyadri", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;