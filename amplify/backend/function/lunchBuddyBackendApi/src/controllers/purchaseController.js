const purchaseModel = require("../models/purchaseModel");

exports.postPurchase = async (req, res) => {
  const reqBodyObj = req.body;

  try {
    const purchaseIdObj = await purchaseModel.postPurchase({
      request_id: reqBodyObj.requestId,
      responder_id: reqBodyObj.responderId,
      reciept_id: reqBodyObj.recieptId,
    });
    console.log(purchaseIdObj);
    await Promise.all(
      reqBodyObj.itemList.map(async (item) => {
        return await purchaseModel.postPurchaseDetail({
          purchase_id: purchaseIdObj[0].purchase_id,
          item_name: item.itemName,
          input_price: item.inputPrice,
          menu_flag: item.menuFlag,
        });
      })
    );
    res.status(200).json({ msg: "OK" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
