const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
// const signUpModel = require("../models/signUpModel");
// const listRequestsModel = require("../models/listRequestsModel");
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

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("get offices", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("post users", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("get items", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("get gratitudes", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("post requests", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("get requestsList", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("get gratitudesSum", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
  describe("post statuses", () => {
    it("", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
});
