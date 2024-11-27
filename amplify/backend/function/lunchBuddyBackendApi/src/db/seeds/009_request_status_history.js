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
      status_changed_user_id: 4,
      created_at: "2024-11-22 10:53:18.174768+09",
    },
    {
      request_id: 2,
      status_id: 1,
      status_changed_user_id: 2,
      created_at: "2024-11-22 10:56:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 1,
      status_changed_user_id: 4,
      created_at: "2024-11-22 11:58:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 2,
      status_changed_user_id: 1,
      created_at: "2024-11-22 12:58:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 3,
      status_changed_user_id: 1,
      created_at: "2024-11-22 13:58:18.174768+09",
    },
    {
      request_id: 3,
      status_id: 4,
      status_changed_user_id: 4,
      created_at: "2024-11-22 14:58:18.174768+09",
    },
    {
      request_id: 4,
      status_id: 1,
      status_changed_user_id: 5,
      created_at: "2024-11-22 11:59:18.174768+09",
    },
    {
      request_id: 4,
      status_id: 2,
      status_changed_user_id: 1,
      created_at: "2024-11-22 12:59:18.174768+09",
    },
    {
      request_id: 4,
      status_id: 3,
      status_changed_user_id: 1,
      created_at: "2024-11-22 13:59:18.174768+09",
    },
    {
      request_id: 4,
      status_id: 4,
      status_changed_user_id: 5,
      created_at: "2024-11-22 14:59:18.174768+09",
    },
    {
      request_id: 5,
      status_id: 1,
      status_changed_user_id: 3,
      created_at: "2024-11-22 12:09:18.174768+09",
    },
    {
      request_id: 5,
      status_id: 2,
      status_changed_user_id: 1,
      created_at: "2024-11-22 13:29:18.174768+09",
    },
    {
      request_id: 6,
      status_id: 1,
      status_changed_user_id: 5,
      created_at: "2024-11-22 12:12:18.174768+09",
    },
    {
      request_id: 6,
      status_id: 2,
      status_changed_user_id: 1,
      created_at: "2024-11-22 12:18:18.174768+09",
    },
    {
      request_id: 6,
      status_id: 3,
      status_changed_user_id: 1,
      created_at: "2024-11-22 12:42:18.174768+09",
    },
  ]);
};
