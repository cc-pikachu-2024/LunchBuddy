/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("purchase_detail").del();
  await knex("purchase_detail").insert([
    {
      purchase_id: 1,
      item_name: "おにぎり",
      input_price: 150,
      menu_flag: true,
    },
    {
      purchase_id: 1,
      item_name: "パン",
      input_price: 200,
      menu_flag: true,
    },
    {
      purchase_id: 1,
      item_name: "水",
      input_price: 110,
      menu_flag: false,
    },
    {
      purchase_id: 1,
      item_name: "アイス",
      input_price: 180,
      menu_flag: false,
    },
    {
      purchase_id: 2,
      item_name: "コーヒー",
      input_price: 180,
      menu_flag: true,
    },
    {
      purchase_id: 2,
      item_name: "プロテイン",
      input_price: 160,
      menu_flag: false,
    },
    {
      purchase_id: 2,
      item_name: "チロルチョコ",
      input_price: 30,
      menu_flag: false,
    },
    {
      purchase_id: 2,
      item_name: "ガリガリ君",
      input_price: 80,
      menu_flag: false,
    },
    {
      purchase_id: 3,
      item_name: "サンドイッチ",
      input_price: 220,
      menu_flag: true,
    },
    {
      purchase_id: 3,
      item_name: "コーヒー",
      input_price: 180,
      menu_flag: true,
    },
    {
      purchase_id: 3,
      item_name: "スムージー",
      input_price: 160,
      menu_flag: false,
    },
    {
      purchase_id: 3,
      item_name: "蒲焼さん太郎",
      input_price: 30,
      menu_flag: false,
    },
  ]);
};
