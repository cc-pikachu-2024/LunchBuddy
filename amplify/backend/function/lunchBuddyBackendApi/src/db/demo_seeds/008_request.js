/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request").del();
  await knex("request").insert([
    {
      requester_id: 2,
      menu_id: 1,
      gratitude_id: 1,
      requester_comment: "おにぎりは鮭でお願いします。",
    },
    {
      requester_id: 3,
      menu_id: 2,
      gratitude_id: 2,
      requester_comment: "お茶は烏龍茶でお願いします。",
    },
  ]);
};
