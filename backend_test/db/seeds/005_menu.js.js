/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("menu").del();
  await knex("menu").insert([
    {
      total_price: 300,
    },
    {
      total_price: 500,
    },
  ]);
};
