const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const createRequestController = require("../controllers/createRequestController");
const listRequestsController = require("../controllers/listRequestsController");

router.get("/offices", signUpController.getAllOffices);
router.post("/users", signUpController.postUserInfo);

router.get("/items", createRequestController.anyMethod);
router.get("/gratitudes", createRequestController.anyMethod);
router.post("/requests", createRequestController.anyMethod);

router.get("/requestsList", listRequestsController.anyMethod);
router.get("/gratitudesSum", listRequestsController.anyMethod);
router.post("/statuses", listRequestsController.anyMethod);

module.exports = router;
