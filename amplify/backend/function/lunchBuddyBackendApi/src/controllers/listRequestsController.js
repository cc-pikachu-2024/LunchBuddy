const listRequestsModel = require("../models/listRequestsModel");
const { format } = require("date-fns-tz");

exports.getAllRequests = async (req, res) => {
  try {
    const requestsList = await listRequestsModel.getAllRequests();

    const convertedRequestsList = requestsList.reduce((acc, current) => {
      let existingEntry = acc.find((entry) => entry.id === current.request_id);
      const itemList = {
        itemId: current.item_id,
        itemImageName: current.item_image_name,
        itemName: current.item_name,
        maxPrice: current.item_max_price,
      };
      if (existingEntry) {
        existingEntry.itemList.push(itemList);
      } else {
        const {
          item_id,
          item_image_name,
          item_name,
          max_price,
          ...target_data
        } = current;
        const convertedTargetData = {
          id: target_data.request_id,
          requesterId: target_data.requester_id,
          requesterName: target_data.requester_name,
          requesterFloor: target_data.requester_floor,
          requesterSeat: target_data.requester_seat,
          menuId: target_data.menu_id,
          gratitudeId: target_data.gratitude_id,
          gratitudeMaxPrice: target_data.gratitude_max_price,
          requesterComment: target_data.requester_comment,
          totalMaxPrice: target_data.total_max_price,
          menuDetailId: target_data.menu_detail_id,
          requestStatusHistoryId: target_data.request_status_history_id,
          responderId: target_data.responder_id,
          statusId: target_data.status_id,
          createdAt: format(
            target_data.created_at,
            "yyyy-MM-dd HH:mm:ss.SSSXXX",
            {
              timeZone: "Asia/Tokyo",
            }
          ),
        };
        acc.push({ ...convertedTargetData, itemList: [itemList] });
      }
      return acc;
    }, []);
    res.status(200).json(convertedRequestsList);
  } catch (err) {
    res.status(500).json({ error: "Failed to get requests" });
  }
};

exports.getGratitudesPriceSum = async (req, res) => {
  try {
    const userId = req.query.userId;
    const gratitudesPriceSum =
      (await listRequestsModel.getGratitudesPriceSum(userId)).sum || 0;
    res.status(200).json({ sum: gratitudesPriceSum });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get gratitudes price sum" });
  }
};

exports.postStatus = async (req, res) => {
  try {
    const status = req.body;
    const convertedStatus = {
      request_id: status.requestId,
      status_id: status.statusId,
      status_changed_user_id: status.userId,
    };

    const latestStatus = await listRequestsModel.postStatus(convertedStatus);
    // 「任せて」 -> 「キャンセル」 status_id= 1-> 2への変更の場合にはresponderテーブルへのinsertも実行
    if (status.statusId === 2 && !status.isCancel) {
      const responder = await listRequestsModel.postResponder(
        status.requestId,
        status.userId
      );
      latestStatus["responder_id"] = responder.user_id;
    } else if (status.statusId === 1 && status.isCancel) {
      await listRequestsModel.deleteResponder(status.requestId, status.userId);
      latestStatus["responder_id"] = "";
    }
    res.status(200).json(latestStatus);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to post status" });
  }
};
