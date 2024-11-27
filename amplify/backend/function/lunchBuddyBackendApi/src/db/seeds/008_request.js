/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("request").del();
  await knex("request").insert([
    {
      requester_id: 4,
      menu_id: 1,
      gratitude_id: 1,
      requester_comment: "",
    },
    {
      requester_id: 2,
      menu_id: 2,
      gratitude_id: 2,
      requester_comment: "",
    },
    {
      requester_id: 4,
      menu_id: 3,
      gratitude_id: 3,
      requester_comment: "",
    },
    {
      requester_id: 5,
      menu_id: 4,
      gratitude_id: 3,
      requester_comment: "",
    },
    {
      requester_id: 3,
      menu_id: 5,
      gratitude_id: 3,
      requester_comment: "鮭とおかかで",
    },
    {
      requester_id: 5,
      menu_id: 6,
      gratitude_id: 2,
      requester_comment: "何でも大丈夫です！",
    },
  ]);
};
