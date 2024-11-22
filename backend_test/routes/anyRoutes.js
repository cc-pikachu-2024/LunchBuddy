const express = require("express");
const router = express.Router();
const anyController = require("../controllers/anyController");

router.get("/", anyController.anyMethod);

module.exports = router;
