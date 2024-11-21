const express = require("express");
const app = express();
const anyRoutes = require("./routes/anyRoutes");

app.use("/requests", anyRoutes);

module.exports = app;
