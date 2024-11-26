const knex = require("../db/knex");

module.exports = {
    async findByTelNumber(tel) {
        return await knex("user").where({ tel_number: tel }).first();
    }
};