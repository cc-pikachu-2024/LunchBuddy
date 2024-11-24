exports.up = function (knex) {
  return knex.schema.createTable("menu", (table) => {
    table.increments("menu_id").primary();
    table.integer("total_max_price");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("menu");
};
