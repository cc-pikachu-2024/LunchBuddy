const knex = require('../db/knex');

module.exports = {
  async getAllRequests() {
    return knex.select('*').from('request');
  },
};

module.exports = {
  async getGratitudesSum() {},
};

module.exports = {
  async postStatus(status) {
    await knex('request_status_history')
      .insert(status)
      .returning([
        'request_history_id',
        'request_id',
        'status_id',
        'created_at',
      ])
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
