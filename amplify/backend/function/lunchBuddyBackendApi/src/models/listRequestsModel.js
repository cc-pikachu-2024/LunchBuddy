const knex = require("../db/knex");

module.exports = {
  async getAllRequests() {
    const latestStatusIdsJson = await knex("request_status_history")
      .select("request_history_id")
      .whereRaw(
        "created_at = (SELECT MAX(created_at) FROM request_status_history AS rh2 WHERE rh2.request_id = request_status_history.request_id)"
      );

    const latestStatusIds = latestStatusIdsJson.map((record) => {
      return record.request_history_id;
    });

    return knex("request")
      .join("menu", "request.menu_id", "menu.menu_id")
      .join("menu_detail", "menu.menu_id", "menu_detail.menu_id")
      .join("item_master", "menu_detail.item_id", "item_master.item_id")
      .join("gratitude", "request.gratitude_id", "gratitude.gratitude_id")
      .join("user", "request.user_id", "user.user_id")
      .join(
        "request_status_history",
        "request.request_id",
        "request_status_history.request_id"
      )
      .leftJoin("responder", "request.request_id", "responder.request_id")
      .whereIn("request_status_history.request_history_id", latestStatusIds)
      .whereIn("request_status_history.status_id", [1, 2, 3])
      .select(
        "request.request_id as request_id",
        "request.requester_comment as requester_comment",
        "user.user_id as requester_id",
        "user.user_name as requester_name",
        "user.floor as requester_floor",
        "user.seat as requester_seat",
        "menu.menu_id as menu_id",
        "menu.total_max_price as total_max_price",
        "gratitude.gratitude_id as gratitude_id",
        "gratitude.max_price as gratitude_max_price",
        "menu_detail.menu_detail_id as menu_detail_id",
        "request_status_history.request_history_id as request_status_history_id",
        "request_status_history.status_id as status_id",
        "request_status_history.created_at as created_at",
        "responder.user_id as responder_id",
        "item_master.item_id as item_id",
        "item_master.item_image_name as item_image_name",
        "item_master.item_name as item_name",
        "item_master.max_price as item_max_price"
      );
  },
  //INFO: 各リクエストごとにmenu_detailの数だけレコードができる。
  //      item_nameをまとめて出すためにはこうするしかないか？
  //      この場合、controllerでいい感じにまとめて返してあげる必要があるか。
  //TODO: とりあえずselect('*')にしてしまっているが、列を絞る必要があるか要検討。

  async getGratitudesPriceSum(userId) {
    return knex("purchase")
      .join(
        "purchase_detail",
        "purchase.purchase_id",
        "purchase_detail.purchase_id"
      )
      .where("purchase.user_id", userId)
      .andWhere("purchase_detail.menu_flag", false)
      .sum("purchase_detail.input_price")
      .first();
  },

  async postStatus(status) {
    return knex("request_status_history")
      .insert(status)
      .returning([
        "request_history_id",
        "request_id",
        "status_id",
        "user_id",
        "created_at",
      ]);
  },

  async postResponder(request_id, user_id) {
    try {
      return knex("responder").insert({ request_id, user_id });
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },

  async deleteResponder(request_id, user_id) {
    try {
      await knex("responder").where({ request_id, user_id }).del();
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },
};
