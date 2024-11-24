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
      created_at: "2024-11-23 21:53:18.174768+09",
    },
    {
      request_id: 1,
      status_id: 2,
      user_id: 1,
      created_at: "2024-11-23 21:54:18.174768+09",
    },
    {
      request_id: 1,
      status_id: 3,
      user_id: 1,
      created_at: "2024-11-23 21:55:18.174768+09",
    },
    {
      request_id: 2,
      status_id: 1,
      user_id: 1,
      created_at: "2024-11-23 21:56:18.174768+09",
    },
    {
      request_id: 2,
      status_id: 2,
      user_id: 1,
      created_at: "2024-11-23 21:57:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 1,
      user_id: 2,
      created_at: "2024-11-23 21:58:18.174768+09",
    },
  ]);
};
