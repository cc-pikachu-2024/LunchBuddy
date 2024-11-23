const createRequestModel = require("../models/createRequestModel");
const listRequestsModel = require("../models/listRequestsModel");

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

exports.postRequest = async (req, res) => {
  reqBodyObj = req.body;

  try {
    const menuResult = await createRequestModel.postMenu({
      total_max_price: reqBodyObj.totalMaxPrice,
    });

    const menuDetailArray = reqBodyObj.itemIds.map((value) => {
      return { menu_id: menuResult[0].menu_id, item_id: value };
    });

    await Promise.all(
      menuDetailArray.map((value) => {
        return createRequestModel.postMenuDetail(value);
      })
    );

    const requestResult = await createRequestModel.postRequest({
      user_id: reqBodyObj.userId,
      menu_id: menuResult[0].menu_id,
      gratitude_id: reqBodyObj.gratitudeId,
      requester_comment: reqBodyObj.requesterComment,
    });

    await createRequestModel.postResponder({
      request_id: requestResult[0].request_id,
      user_id: reqBodyObj.responderId,
    });

    await listRequestsModel.postStatus({
      request_id: requestResult[0].request_id,
      status_id: 1,
      user_id: reqBodyObj.userId,
    });

    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
