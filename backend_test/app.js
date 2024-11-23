const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/requests", routes);

module.exports = app;
