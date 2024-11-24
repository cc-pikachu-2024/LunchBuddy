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
      .join(
        "request_status_history",
        "request.request_id",
        "request_status_history.request_id"
      )
      .leftJoin("responder", "request.request_id", "responder.request_id")
      .whereIn("request_status_history.request_history_id", latestStatusIds)
      .select("*");
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
      .sum("purchase_detail.input_price");
  },

  async postStatus(status) {
    try {
      const result = await knex("request_status_history")
        .insert(status)
        .returning([
          "request_history_id",
          "request_id",
          "status_id",
          "user_id",
          "created_at",
        ]);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },
  async postResponder(obj) {
    try {
      const result = await knex("responder")
        .insert(obj)
        .returning(["request_id", "user_id"]);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },
};
