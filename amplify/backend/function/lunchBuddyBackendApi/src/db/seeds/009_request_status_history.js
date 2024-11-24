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
      user_id: 1,
      created_at: "2024-11-22 10:53:18.174768+09",
    },
    {
      request_id: 2,
      status_id: 1,
      user_id: 2,
      created_at: "2024-11-22 10:56:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 1,
      user_id: 4,
      created_at: "2024-11-21 11:58:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 2,
      user_id: 1,
      created_at: "2024-11-21 12:58:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 3,
      user_id: 1,
      created_at: "2024-11-21 13:58:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 4,
      user_id: 4,
      created_at: "2024-11-21 14:58:18.174768+09",
    },
  ]);
};
