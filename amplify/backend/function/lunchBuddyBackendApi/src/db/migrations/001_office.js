exports.up = function (knex) {
  return knex.schema.createTable("office", (table) => {
    table.increments("office_id").primary();
    table.string("office_name", 30);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("office");
};
