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
      item_name: "おにぎり",
      input_price: 150,
      menu_flag: true,
    },
    {
      purchase_id: 1,
      item_name: "パン",
      input_price: 200,
      menu_flag: true,
    },
    {
      purchase_id: 1,
      item_name: "水",
      input_price: 110,
      menu_flag: false,
    },
    {
      purchase_id: 1,
      item_name: "アイス",
      input_price: 180,
      menu_flag: false,
    },
  ]);
};
