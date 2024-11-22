/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("gratitude").del();
  await knex("gratitude").insert([
    {
      gratitude_id: 1,
      max_price: 150,
    },
    {
      gratitude_id: 2,
      max_price: 200,
    },
  ]);
};
