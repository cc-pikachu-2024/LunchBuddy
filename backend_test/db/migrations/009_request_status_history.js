exports.up = function (knex) {
  return knex.schema.createTable("request_status_history", (table) => {
    table.increments("request_history_id").primary();
    table.integer("request_id").references("request_id").inTable("request");
    table
      .integer("status_id")
      .references("status_id")
      .inTable("request_status");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("request_status_history");
};
