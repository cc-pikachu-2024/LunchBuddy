/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("item_master").del();
  await knex("item_master").insert([
    {
      item_id: 1,
      item_image_name: "xxx",
      item_name: "xxx",
      max_price: 200,
    },
    {
      item_id: 2,
      item_image_name: "yyy",
      item_name: "yyy",
      max_price: 300,
    },
  ]);
};
