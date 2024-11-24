/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("office").del();
  await knex("office").insert([
    { office_name: "office1" },
    { office_name: "office2" },
  ]);
};
