const knex = require("../db/knex");

module.exports = {
  async getAllOffices() {
    return knex.select("*").from("office");
  },

  async postUserInfo(userInfo) {
    try {
      const result = await knex("user")
        .insert(userInfo)
        .returning([
          "user_id",
          "user_name",
          "password",
          "office_id",
          "floor",
          "seat",
          "tel_number",
        ]);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },
};
