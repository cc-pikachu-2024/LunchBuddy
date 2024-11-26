exports.up = function (knex) {
  return knex.schema.createTable("request", (table) => {
    table.increments("request_id").primary();
    table.integer("requester_id").references("user_id").inTable("user");
    table.integer("menu_id").references("menu_id").inTable("menu");
    table
      .integer("gratitude_id")
      .references("gratitude_id")
      .inTable("gratitude");
    table.string("requester_comment", 100);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("request");
};
