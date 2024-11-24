/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("responder").del();
  await knex("responder").insert([
    {
      request_id: 1,
      user_id: 1,
    },
    {
      request_id: 2,
      user_id: 1,
    },
    {
      request_id: 3,
      user_id: 2,
    },
  ]);
};