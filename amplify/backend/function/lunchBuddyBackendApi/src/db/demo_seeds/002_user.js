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
      office_id: 3,
      floor: 10,
      seat: "A12",
      tel_number: "111-1111-1111",
    },
    {
      user_name: "生田健",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 3,
      floor: 2,
      seat: "C15",
      tel_number: "222-2222-2222",
    },
    {
      user_name: "佐藤翔",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 3,
      floor: 2,
      seat: "D16",
      tel_number: "333-3333-3333",
    },
    {
      user_name: "鈴木次郎",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 3,
      floor: 10,
      seat: "B10",
      tel_number: "444-4444-4444",
    },
    {
      user_name: "原隆史",
      password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
      office_id: 3,
      floor: 2,
      seat: "E17",
      tel_number: "555-5555-5555",
    },
  ]);
};
