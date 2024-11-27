const knex = require("../db/knex");

module.exports = {
  async putPurchase() {
    try {
      const hoge = await knex();
      return hoge;
    } catch (error) {
      throw new Error("Database error");
    }
  },
};

module.exports = {
  async putPurchaseDetail() {
    try {
      const hoge = await knex();
      return hoge;
    } catch (error) {
      throw new Error("Database error");
    }
  },
};
