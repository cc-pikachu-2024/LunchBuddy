const knex = require('../db/knex');

module.exports = {
  async getAllRequests() {
    return knex.select('*').from('request');
  },
};

module.exports = {
  async getGratitudesPriceSum(user_id) {
    return knex
      .select('purchase')
      .join(
        'purchase_detail',
        'purchase.purchase_id',
        'purchase_detail.purchase_id'
      )
      .where('purchase.user_id', user_id)
      .andWhere('purchase_detail.menu_flag', false)
      .sum('purchase_detail.input_price');
  },
};

module.exports = {
  async postStatus(status) {
    knex('request_status_history')
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
