/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request_status_history").del();
  await knex("request_status_history").insert([
    {
      request_id: 1,
      status_id: 1,
      status_changed_user_id: 2,
      created_at: "2024-11-28 11:30:00.170000+05",
    },
    {
      request_id: 2,
      status_id: 1,
      status_changed_user_id: 3,
      created_at: "2024-11-28 11:35:00.170000+05",
    },
  ]);
};
