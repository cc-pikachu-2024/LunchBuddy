/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("gratitude").del();
  await knex("gratitude").insert([
    {
      max_price: 150,
    },
    {
      max_price: 200,
    },
  ]);
};
