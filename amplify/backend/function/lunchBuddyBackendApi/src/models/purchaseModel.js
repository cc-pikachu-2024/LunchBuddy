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
};

module.exports = {
  async postPurchaseDetail(obj) {
    try {
      await knex("purchase").insert(obj);
    } catch {
      throw new Error("Database error");
    }
  },
};
