const knex = require("../db/knex");

module.exports = {
  async getAllOffices() {
    return knex.select("*").from("office");
  },

  async postUserInfo(userInfo) {
    await knex("user")
      .insert(userInfo)
      .returning([
        "user_id",
        "user_name",
        "password",
        "office_id",
        "floor",
        "seat",
        "tel_number",
      ])
      .then(() => {
        console.log("Insert successful");
      })
      .catch((err) => {
        console.error("Insert failed:", err);
      });
  },
};
