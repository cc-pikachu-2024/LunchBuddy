const express = require("express");
const bodyParser = require("body-parser");
const anyRoutes = require("./routes/anyRoutes");

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/requests", anyRoutes);

module.exports = app;
