const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const createRequestController = require("../controllers/createRequestController");
const listRequestsController = require("../controllers/listRequestsController");
const loginController = require("../controllers/loginController");
const purchaseController = require("../controllers/purchaseController");

router.get("/offices", signUpController.getAllOffices);
router.get("/users", signUpController.getUserInfo);
router.post("/users", signUpController.postUserInfo);

router.post("/loginUser", loginController.postLogin);

router.get("/items", createRequestController.getAllItems);
router.get("/gratitudes", createRequestController.getAllGratitudes);
router.post("/requests", createRequestController.postRequest);

router.get("/requestsList", listRequestsController.getAllRequests);
router.get("/gratitudesSum", listRequestsController.getGratitudesPriceSum);
router.post("/statuses", listRequestsController.postStatus);
router.get("/purchasedItems", listRequestsController.getPurchasedItemList);

router.post("/purchase", purchaseController.postPurchase);

module.exports = router;
