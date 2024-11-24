const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const createRequestController = require("../controllers/createRequestController");
const listRequestsController = require("../controllers/listRequestsController");

router.get("/offices", signUpController.getAllOffices);
router.post("/users", signUpController.postUserInfo);

router.get("/items", createRequestController.getAllItems);
router.get("/gratitudes", createRequestController.getAllGratitudes);
router.post("/requests", createRequestController.postRequest);

router.get("/requestsList", listRequestsController.getAllRequests);
router.get("/gratitudesSum", listRequestsController.getGratitudesPriceSum);
router.post("/statuses", listRequestsController.postStatus);

module.exports = router;
