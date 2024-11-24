exports.up = function (knex) {
  return knex.schema.createTable("responder", (table) => {
    table.integer("request_id").references("request_id").inTable("request");
    table.integer("user_id").references("user_id").inTable("user");
    table.primary(["request_id", "user_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("responder");
};
