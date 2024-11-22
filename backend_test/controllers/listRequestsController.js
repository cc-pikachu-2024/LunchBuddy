const listRequestsModel = require("../models/listRequestsModel");

exports.getAllRequests = async (req, res) => {
  try {
    const requestsList = await listRequestsModel.getAllRequests();
    res.status(200).json(requestsList);
  } catch (err) {
    console.log(err);
  }
};

exports.getGratitudesSum = async (req, res) => {};

exports.postStatuses = async (req, res) => {
  try {
    const status = req.body;
    await listRequestsModel.postStatuses(status);
    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
