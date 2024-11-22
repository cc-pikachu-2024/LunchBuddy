/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("purchase_detail").del();
  await knex("purchase_detail").insert([
    {
      purchase_id: 1,
      item_name: "xxx",
      input_price: 100,
      menu_flag: 0,
    },
    {
      purchase_id: 1,
      item_name: "yyy",
      input_price: 200,
      menu_flag: 1,
    },
  ]);
};