/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request_status").del();
  await knex("request_status").insert([
    {
      status_name: "waiting",
    },
    {
      status_name: "progress",
    },
    {
      status_name: "settlement",
    },
    {
      status_name: "done",
    },
    {
      status_name: "abandoned",
    },
  ]);
};
