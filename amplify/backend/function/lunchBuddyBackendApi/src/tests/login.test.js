const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const knex = require("../db/knex");
const loginModel = require("../models/loginModel");
const bcrypt = require("bcrypt");

describe("", async () => {
    let sandbox;
    let request;
  
    before(() => {
      request = chai.request(app).keepOpen();
      sandbox = sinon.createSandbox();
    });
  
    after(() => {
      request.close();
      sandbox.restore(); 
    });

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash("testpassword", 10);
        await knex("user").insert({
            user_name: 'testuser',
            password: hashedPassword,
            office_id: 1,
            floor: "5",
            seat: "A10",
            tel_number: '1234567890',
        });
    });
    afterEach(async () => {
        await knex('users').where({ tel_number: '1234567890' }).del();
    });




}











)


