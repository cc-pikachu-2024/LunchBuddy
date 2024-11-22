/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request_status_history").del();
  await knex("request_status_history").insert([
    {
      request_history_id: 1,
      request_id: 1,
      status_id: 1,
    },
    {
      request_history_id: 2,
      request_id: 1,
      status_id: 2,
    },
  ]);
};
