const knex = require("../db/knex");
const bcrypt = require("bcryptjs");

module.exports = {
  async getAllOffices() {
    return knex.select("*").from("office");
  },

  async postUserInfo(userInfo) {
    try {
      const hashedPassword = await bcrypt.hash(userInfo.password, 10); //ハッシュ化
      console.log(hashedPassword);
      const result = await knex("user")
        .insert({ ...userInfo, password: hashedPassword })
        .returning([
          "user_id",
          "user_name",
          "password",
          "office_id",
          "floor",
          "seat",
          "tel_number",
        ]);
      console.log("登録結果:", result);
      return result;
    } catch (err) {
      console.error("Insert failed:", err);
    }
  },

  async getUserInfo(userId) {
    try {
      const result = await knex("user")
        .select("*")
        .where({ user_id: userId })
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
