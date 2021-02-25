const express = require("express");

const app = express();

const { sequelize } = require("./models");

app.listen(5000, async () => {
  console.log("Running on port 5000");
  await sequelize.sync({ force: true });
  console.log("database connected");
});
