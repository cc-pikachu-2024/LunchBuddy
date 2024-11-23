const knex = require('../db/knex');

module.exports = {
  async getAllItems() {
    return knex.select('*').from('item_master');
  },
};

module.exports = {
  async getAllGratitudes() {
    return knex.select('*').from('gratitudes');
  },
};

module.exports = {
  async postRequest() {},
};
