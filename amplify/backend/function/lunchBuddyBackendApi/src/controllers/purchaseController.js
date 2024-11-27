const purchaseModel = require("../models/purchaseModel");

exports.postPurchase = async (req, res) => {
  const reqBodyObj = req.body;

  try {
    console.log(reqBodyObj);
    const purchaseId = await purchaseModel.postPurchase({
      request_id: reqBodyObj.requestId,
      responder_id: reqBodyObj.responderId,
      receipt_id: reqBodyObj.receiptId,
    });
    await Promise.all(
      reqBodyObj.itemList.map(async (item) => {
        return await purchaseModel.postPurchaseDetail({
          purchase_id: purchaseId,
          item_name: item.itemName,
          input_price: item.inputPrice,
          menu_flag: item.menuFlag,
        });
      })
    );
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
