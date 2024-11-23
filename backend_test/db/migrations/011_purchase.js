exports.up = function (knex) {
  return knex.schema.createTable("purchase", (table) => {
    table.increments("purchase_id").primary();
    table.integer("request_id").references("request_id").inTable("request");
    table.integer("user_id").references("user_id").inTable("user");
    table.string("reciept_id", 100);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("purchase");
};
