const knex = require("knex");
const knexConfig = require("../knexfile");
const _ = require("../dotenv");

const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexConfig[environment]);
