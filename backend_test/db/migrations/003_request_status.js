exports.up = function (knex) {
  return knex.schema.createTable("request_status", (table) => {
    table.increments("status_id").primary();
    table.string("status_name", 30);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("request_status");
};
