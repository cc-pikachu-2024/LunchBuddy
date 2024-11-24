const listRequestsModel = require("../models/listRequestsModel");

exports.getAllRequests = async (req, res) => {
  try {
    const requestsList = await listRequestsModel.getAllRequests();

    const convertedRequestsList = requestsList.reduce((acc, current) => {
      let existingEntry = acc.find((entry) => entry.id === current.request_id);
      const itemList = {
        itemId: current.item_id,
        itemImageName: current.item_image_name,
        itemName: current.item_name,
        maxPrice: current.max_price,
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
          requestHistoryId: target_data.request_history_id,
          statusId: target_data.status_id,
          createdAt: target_data.created_at,
        };
        acc.push({ ...convertedTargetData, itemList: [itemList] });
      }
      return acc;
    }, []);

    res.status(200).json(convertedRequestsList);
  } catch (err) {
    console.log(err);
  }
};

// exports.getAllRequests = async (req, res) => {
//   try {
//     const requestsList = await listRequestsModel.getAllRequests();

//     const convertedRequestsList = requestsList.reduce((acc, current) => {
//       let existingEntry = acc.find(
//         (entry) => entry.request_id === current.request_id
//       );
//       if (existingEntry) {
//         if (!Array.isArray(existingEntry.item_id)) {
//           existingEntry.item_id = [existingEntry.item_id];
//         }
//         existingEntry.item_id.push(current.item_id);
//       } else {
//         acc.push({ ...current, item_id: [current.item_id] });
//       }
//       return acc;
//     }, []);

//     res.status(200).json(convertedRequestsList);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.getGratitudesPriceSum = async (req, res) => {
  try {
    const userId = req.query.userId;
    const gratitudesPriceSum =
      (await listRequestsModel.getGratitudesPriceSum(userId)).sum || 0;
    res.status(200).json({ sum: gratitudesPriceSum });
  } catch (err) {
    console.log(err);
  }
};

exports.postStatus = async (req, res) => {
  try {
    const status = req.body;
    const convertedStatus = {
      request_id: status.requestId,
      status_id: status.statusId,
      user_id: status.userId,
    };
    const latestStatus = await listRequestsModel.postStatus(convertedStatus);
    res.status(200).json(latestStatus);
  } catch (err) {
    console.log(err);
  }
};
