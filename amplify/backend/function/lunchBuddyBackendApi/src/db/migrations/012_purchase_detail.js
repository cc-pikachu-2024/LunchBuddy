exports.up = function (knex) {
  return knex.schema.createTable("purchase_detail", (table) => {
    table.increments("purchase_detail_id").primary();
    table.integer("purchase_id").references("purchase_id").inTable("purchase");
    table.string("item_name", 30);
    table.integer("input_price");
    table.boolean("menu_flag");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("purchase_detail");
};
