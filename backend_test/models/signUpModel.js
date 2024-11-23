const knex = require('../db/knex');

module.exports = {
  async getAllOffices() {
    return knex.select('*').from('office');
  },
};

module.exports = {
  async postUserInfo(userInfo) {
    await knex('user')
      .insert(userInfo)
      .then(() => {
        console.log('Insert successful');
      })
      .catch((err) => {
        console.error('Insert failed:', err);
      })
      .finally(() => {
        knex.destroy();
      });
  },
};
