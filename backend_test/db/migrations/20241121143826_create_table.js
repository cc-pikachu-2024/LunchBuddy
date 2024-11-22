exports.up = function (knex) {
  return knex.schema.createTable("", (table) => {});
};

exports.down = function (knex) {
  return knex.schema.dropTable("");
};
