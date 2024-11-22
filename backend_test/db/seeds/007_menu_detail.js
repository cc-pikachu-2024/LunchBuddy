/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("menu_detail").del();
  await knex("menu_detail").insert([
    {
      menu_id: 1,
      item_id: 1,
    },
    {
      menu_id: 1,
      item_id: 2,
    },
    {
      menu_id: 2,
      item_id: 1,
    },
    {
      menu_id: 2,
      item_id: 2,
    },
  ]);
};