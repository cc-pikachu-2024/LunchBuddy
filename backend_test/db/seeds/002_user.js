/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      user_id: 1,
      user_name: "user1",
      password: "xxx",
      office_id: 1,
      floor: 10,
      seat: 100,
      tel_number: "xxx-xxx-xxx",
    },
    {
      user_id: 2,
      user_name: "user2",
      password: "yyy",
      office_id: 2,
      floor: 11,
      seat: 101,
      tel_number: "yyy-yyy-yyy",
    },
  ]);
};
