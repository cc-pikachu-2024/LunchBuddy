/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("purchase").del();
  await knex("purchase").insert([
    {
      purchase_id: 1,
      request_id: 1,
      user_id: 1,
      reciept_id: "xxx",
    },
  ]);
};
