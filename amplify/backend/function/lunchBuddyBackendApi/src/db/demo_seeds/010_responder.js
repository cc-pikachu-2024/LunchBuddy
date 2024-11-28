/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("responder").del();
  await knex("responder").insert([
    {
      request_id: 3,
      responder_id: 1,
    },
    {
      request_id: 4,
      responder_id: 1,
    },
    {
      request_id: 5,
      responder_id: 1,
    },
    {
      request_id: 6,
      responder_id: 1,
    },
  ]);
};
