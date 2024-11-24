exports.up = function (knex) {
  return knex.schema.createTable("item_master", (table) => {
    table.increments("item_id").primary();
    table.string("item_image_name", 100);
    table.string("item_name", 100);
    table.integer("max_price");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("item_master");
};
