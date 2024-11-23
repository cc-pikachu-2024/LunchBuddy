const listRequestsModel = require('../models/listRequestsModel');

exports.getAllRequests = async (req, res) => {
  try {
    const requestsList = await listRequestsModel.getAllRequests();
    res.status(200).json(requestsList);
  } catch (err) {
    console.log(err);
  }
};

exports.getGratitudesSum = async (req, res) => {};

exports.postStatus = async (req, res) => {
  try {
    const status = req.body;
    const latestStatus = await listRequestsModel.postStatus(status);
    res.status(200).json(latestStatus);
  } catch (err) {
    console.log(err);
  }
};
