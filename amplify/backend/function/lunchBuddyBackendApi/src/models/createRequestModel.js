const knex = require("../db/knex");

module.exports = {
  async getAllItems() {
    return knex.select("*").from("item_master");
  },

  async getAllGratitudes() {
    return knex.select("*").from("gratitude");
  },

  async postMenu(obj) {
    try {
      const result = await knex("menu")
        .insert(obj)
        .returning(["menu_id", "total_max_price"]);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },

  async postMenuDetail(obj) {
    try {
      const result = await knex("menu_detail")
        .insert(obj)
        .returning(["menu_id", "item_id"]);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },

  async postRequest(obj) {
    try {
      const result = await knex("request")
        .insert(obj)
        .returning([
          "request_id",
          "requester_id",
          "menu_id",
          "gratitude_id",
          "requester_comment",
        ]);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },
};
