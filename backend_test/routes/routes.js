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

router.get("/requestsList", listRequestsController.getAllRequests);
router.get("/gratitudesSum", listRequestsController.getGratitudesSum);
router.post("/statuses", listRequestsController.postStatuses);

module.exports = router;
