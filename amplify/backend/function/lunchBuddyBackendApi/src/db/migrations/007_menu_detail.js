exports.up = function (knex) {
  return knex.schema.createTable("menu_detail", (table) => {
    table.increments("menu_detail_id").primary();
    table.integer("menu_id").references("menu_id").inTable("menu");
    table.integer("item_id").references("item_id").inTable("item_master");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("menu_detail");
};
