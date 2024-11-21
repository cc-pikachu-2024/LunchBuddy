const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const anyModel = require("../models/anyModel");
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

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("", () => {
    it("", async () => {
      // Setup
      const mock = {};

      // Execute
      const res = await request.get("/requests");

      // Assert
    });
  });
});
