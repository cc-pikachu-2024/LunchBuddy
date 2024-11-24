exports.up = function (knex) {
  return knex.schema.createTable("gratitude", (table) => {
    table.increments("gratitude_id").primary();
    table.integer("max_price");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("gratitude");
};
