const createRequestModel = require("../models/createRequestModel");
const listRequestsModel = require("../models/listRequestsModel");

exports.getAllItems = async (req, res) => {
  try {
    const items = await createRequestModel.getAllItems();
    const convertedItems = items.map((item) => {
      return {
        itemId: item.item_id,
        itemImageName: item.item_image_name,
        itemName: item.item_name,
        maxPrice: item.max_price,
      };
    });
    res.status(200).json(convertedItems);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllGratitudes = async (req, res) => {
  try {
    const gratitudes = await createRequestModel.getAllGratitudes();
    const convertedGratitudes = gratitudes.map((gratitude) => {
      return {
        gratitudeId: gratitude.gratitude_id,
        maxPrice: gratitude.max_price,
      };
    });
    res.status(200).json(convertedGratitudes);
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

    await listRequestsModel.postStatus({
      request_id: requestResult[0].request_id,
      status_id: 1,
      user_id: reqBodyObj.userId,
    });

    res.status(200).json(requestResult);
  } catch (err) {
    console.log(err);
  }
};