/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      user_name: "山田花子",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 1,
      floor: 12,
      seat: "S12の柱の横のプーさんのぬいぐるみが置いてある席",
      tel_number: "000-0000-0000",
    },
    {
      user_name: "田中太郎",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 1,
      floor: 2,
      seat: "2A-11",
      tel_number: "111-1111-1111",
    },
    {
      user_name: "佐藤優子",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 1,
      floor: 4,
      seat: "5112",
      tel_number: "222-2222-2222",
    },
    {
      user_name: "鈴木じろう",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 1,
      floor: 22,
      seat: "22F南トイレの入り口横",
      tel_number: "333-3333-3333",
    },
    {
      user_name: "原三郎",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 1,
      floor: 8,
      seat: "8F北区画D21",
      tel_number: "444-4444-4444",
    },
  ]);
};
