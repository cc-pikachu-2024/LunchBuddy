const listRequestsModel = require('../models/listRequestsModel');

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
    const gratitudesPriceSum = await listRequestsModel.getGratitudesPriceSum();
    res.status(200).json(gratitudesPriceSum);
  } catch (err) {
    console.log(err);
  }
};

exports.postStatus = async (req, res) => {
  try {
    const status = req.body;
    const latestStatus = await listRequestsModel.postStatus(status);
    res.status(200).json(latestStatus);
  } catch (err) {
    console.log(err);
  }
};
