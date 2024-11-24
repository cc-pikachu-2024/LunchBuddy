/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("menu").del();
  await knex("menu").insert([
    {
      total_max_price: 300,
    },
    {
      total_max_price: 500,
    },
    {
      total_max_price: 200,
    },
  ]);
};