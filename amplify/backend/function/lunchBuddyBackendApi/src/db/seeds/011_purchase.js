/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("purchase").del();
  await knex("purchase").insert([
    {
      request_id: 1,
      user_id: 1,
      reciept_id: "xxx",
    },
    {
      request_id: 2,
      user_id: 1,
      reciept_id: "yyy",
    },
  ]);
};