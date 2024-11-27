const purchaseModel = require("../models/purchaseModel");

exports.postPurchase = async (req, res) => {
  try {
    console.log(req.body);
    console.log(purchaseModel);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
