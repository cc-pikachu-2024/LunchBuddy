const knex = require("../db/knex");

module.exports = {
  async postPurchase(obj) {
    try {
      const purchaseId = await knex("purchase")
        .insert(obj)
        .returning(["purchase_id"]);
      return purchaseId;
    } catch {
      throw new Error("Database error");
    }
  },
  async postPurchaseDetail(obj) {
    try {
      console.log(obj);
      return await knex("purchase_detail")
        .insert(obj)
        .returning(["purchase_detail_id"]);
    } catch {
      throw new Error("Database error");
    }
  },
};
