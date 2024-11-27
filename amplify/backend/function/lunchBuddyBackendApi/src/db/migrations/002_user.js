exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary();
    table.string("user_name", 30);
    table.string("password", 150);
    table.integer("office_id").references("office_id").inTable("office");
    table.string("floor", 30);
    table.string("seat", 30);
    table.string("tel_number", 30);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
