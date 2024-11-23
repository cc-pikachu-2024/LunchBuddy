/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request_status_history").del();
  await knex("request_status_history").insert([
    {
      request_id: 1,
      status_id: 1,
      user_id: 1,
    },
    {
      request_id: 1,
      status_id: 2,
      user_id: 1,
    },
  ]);
};
