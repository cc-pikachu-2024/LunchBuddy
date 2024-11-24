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
      user_id: 1,
      reciept_id: "xxx",
    },
  ]);
};
