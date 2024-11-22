/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("office").del();
  await knex("office").insert([
    { office_name: "test1" },
    { office_name: "test2" },
  ]);
};
