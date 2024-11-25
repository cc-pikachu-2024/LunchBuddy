const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
// const signUpModel = require("../models/signUpModel");
const listRequestsModel = require("../models/listRequestsModel");
// const createRequestModel = require("../models/createRequestModel");
const knex = require("../db/knex");

chai.use(chaiHttp);

describe("", async () => {
  let sandbox;
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  beforeEach(async () => {
    try {
      await knex.migrate.rollback(null, true);
      await knex.migrate.latest();
      await knex.seed.run();
      sandbox = sinon.createSandbox();
    } catch (err) {
      console.error("Error during setup:", err);
      throw err;
    }
  });

  afterEach(() => {
    sandbox.restore();
  });

  xdescribe("get requestsList", () => {
    xit("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  xdescribe("get gratitudesSum", () => {
    xit("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  xdescribe("post statuses", () => {
    xit("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
});
