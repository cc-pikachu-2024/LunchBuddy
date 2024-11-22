/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request_status").del();
  await knex("request_status").insert([
    {
      status_id: 1,
      status_name: "status1",
    },
    {
      status_id: 2,
      status_name: "status2",
    },
  ]);
};
