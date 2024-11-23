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
  const mockObj = {
    userId: 1,
    gratitudeId: 3,
    requesterComment: "nice to meet you!",
    totalMaxPrice: 500,
    itemIds: [1, 2],
    responderId: 2,
  };
  try {
    const menuResult = await createRequestModel.postMenu({
      total_max_price: mockObj.totalMaxPrice,
    });

    const menuDetailArray = mockObj.itemIds.map((value) => {
      return { menu_id: menuResult[0].menu_id, item_id: value };
    });

    await Promise.all(
      menuDetailArray.map((value) => {
        return createRequestModel.postMenuDetail(value);
      })
    );

    const requestResult = await createRequestModel.postRequest({
      user_id: mockObj.userId,
      menu_id: menuResult[0].menu_id,
      gratitude_id: mockObj.gratitudeId,
      requester_comment: mockObj.requesterComment,
    });

    await createRequestModel.postResponder({
      request_id: requestResult[0].request_id,
      user_id: mockObj.responderId,
    });

    await listRequestsModel.postStatus({
      request_id: requestResult[0].request_id,
      status_id: 1,
      user_id: mockObj.userId,
    });

    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
