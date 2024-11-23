const knex = require("../db/knex");

module.exports = {
  async getAllItems() {
    return knex.select("*").from("item_master");
  },

  async getAllGratitudes() {
    return knex.select("*").from("gratitude");
  },

  async postRequest() {},
};
