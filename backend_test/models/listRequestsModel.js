const knex = require("../db/knex");

module.exports = {
  async getAllRequests() {
    return knex.select("*").from("request");
  },
};

module.exports = {
  async getGratitudesSum() {},
};

module.exports = {
  async postStatuses() {},
};
