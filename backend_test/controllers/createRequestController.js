const createRequestModel = require("../models/createRequestModel");

exports.getAllItems = async (req, res) => {
  try {
    const items = await createRequestModel.getAllItems();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllGratitudes = async (req, res) => {
  try {
    const gratitudes = await createRequestModel.getAllGratitudes();
    res.status(200).json(gratitudes);
  } catch (err) {
    console.log(err);
  }
};
exports.postRequest = async (req, res) => {};
