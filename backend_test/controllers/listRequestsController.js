const listRequestsModel = require("../models/listRequestsModel");

exports.getAllRequests = async (req, res) => {
  try {
    const requestsList = await listRequestsModel.getAllRequests();
    res.status(200).json(requestsList);
  } catch (err) {
    console.log(err);
  }
};

exports.getGratitudesPriceSum = async (req, res) => {
  try {
    const userId = req.query.userId;
    const gratitudesPriceSum = await listRequestsModel.getGratitudesPriceSum(
      userId
    );
    res.status(200).json(gratitudesPriceSum);
  } catch (err) {
    console.log(err);
  }
};

exports.postStatus = async (req, res) => {
  try {
    const status = req.body;
    const convertedStatus = {
      request_id: status.requestId,
      status_id: status.statusId,
      user_id: status.userId,
    };
    const latestStatus = await listRequestsModel.postStatus(convertedStatus);
    res.status(200).json(latestStatus);
  } catch (err) {
    console.log(err);
  }
};
