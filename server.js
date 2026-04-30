const app = require("./app");
const sequelize = require("./config/db");

sequelize.sync() 
  .then(() => {
    console.log("DB updated & connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch(err => console.log(err));