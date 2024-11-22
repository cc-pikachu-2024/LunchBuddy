/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request").del();
  await knex("request").insert([
    {
      request_id: 1,
      user_id: 1,
      menu_id: 1,
      gratitude_id: 1,
      requester_comment: "hello",
    },
    {
      request_id: 2,
      user_id: 2,
      menu_id: 2,
      gratitude_id: 2,
      requester_comment: "hello",
    },
  ]);
};
