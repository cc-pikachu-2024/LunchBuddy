const listRequestsModel = require("../models/listRequestsModel");

exports.getAllRequests = async (req, res) => {
  try {
    const requestsList = await listRequestsModel.getAllRequests();

    const convertedRequestsList = requestsList.reduce((acc, current) => {
      let existingEntry = acc.find(
        (entry) => entry.request_id === current.request_id
      );
      if (existingEntry) {
        if (!Array.isArray(existingEntry.item_id)) {
          existingEntry.item_id = [existingEntry.item_id];
        }
        existingEntry.item_id.push(current.item_id);
      } else {
        acc.push({ ...current, item_id: [current.item_id] });
      }
      return acc;
    }, []);

    res.status(200).json(convertedRequestsList);
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
