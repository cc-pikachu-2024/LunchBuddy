const createRequestModel = require('../models/createRequestModel');

exports.getAllItems = async (req, res) => {
  try {
    const items = createRequestModel.getItems();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllGratitudes = async (req, res) => {
  try {
    const gratitudes = createRequestModel.getGratitudes();
    res.status(200).json(gratitudes);
  } catch (err) {
    console.log(err);
  }
};
exports.postRequest = async (req, res) => {};
