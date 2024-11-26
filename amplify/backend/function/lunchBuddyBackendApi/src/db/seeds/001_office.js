/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("office").del();
  await knex("office").insert([
    { office_name: "大手町オフィス" },
    { office_name: "みなとみらいオフィス" },
    { office_name: "木場オフィス" },
  ]);
};
