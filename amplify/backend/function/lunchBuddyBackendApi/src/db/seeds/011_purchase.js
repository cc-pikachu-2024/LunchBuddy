/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("purchase").del();
  await knex("purchase").insert([
    {
      request_id: 3,
      responder_id: 1,
      reciept_id: "xxx",
    },
    {
      request_id: 4,
      responder_id: 1,
      reciept_id: "xxx",
    },
    {
      request_id: 6,
      responder_id: 1,
      reciept_id: "xxx",
    },
  ]);
};
