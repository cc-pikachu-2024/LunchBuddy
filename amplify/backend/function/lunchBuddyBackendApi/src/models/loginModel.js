const knex = require("../db/knex");

module.exports = {
    async findByPhoneNumber(phoneNumber) {
        try {
            const user = await knex("user").where({ tel_number: phoneNumber }).first();
            return user; 
        } catch (error) {
            throw new Error("Database error"); 
        }
    },
};