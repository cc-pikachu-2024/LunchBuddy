/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("item_master").del();
  await knex("item_master").insert([
    {
      item_image_name: "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu1_onigiri%26tea.png",
      item_name: "おにぎり&お茶",
      max_price: 400,
    },
    {
      item_image_name: "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu2_onigiri2%26tea.png",
      item_name: "おにぎり×2 & お茶",
      max_price: 600,
    },
    {
      item_image_name: "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/onigiri.png",
      item_name: "おにぎり",
      max_price: 200,
    },
    {
      item_image_name: "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/sandwich.png",
      item_name: "サンドイッチ",
      max_price: 300,
    },
    {
      item_image_name: "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/coffee.png",
      item_name: "コーヒー",
      max_price: 200,
    },
    {
      item_image_name: "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/tea.png",
      item_name: "お茶",
      max_price: 200,
    },
  ]);
};
