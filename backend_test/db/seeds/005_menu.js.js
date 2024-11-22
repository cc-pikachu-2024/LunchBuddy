/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("menu").del();
  await knex("menu").insert([
    {
      menu_id: 1,
      total_price: 300,
    },
    {
      menu_id: 2,
      total_price: 500,
    },
  ]);
};
