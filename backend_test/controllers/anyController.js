const anyModel = require("../models/anyModel");

exports.anyMethod = async (req, res) => {
  try {
    await anyModel.anyMethod();
  } catch (err) {
    console.log(err);
  }
};
