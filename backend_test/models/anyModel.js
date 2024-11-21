const knex = require("../db/knex");

module.exports = {
  async anyMethod() {
    return knex.select("*").from("TABLE_NAME");
  },
};
