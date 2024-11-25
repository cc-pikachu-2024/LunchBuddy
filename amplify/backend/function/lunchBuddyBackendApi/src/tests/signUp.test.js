const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const signUpModel = require("../models/signUpModel");
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

  describe("get offices", () => {
    it("参照に成功したら200のステータスコードを返す。", async () => {
      // Setup
      const mock = [
        {
          id: 1,
          name: "大手町オフィス",
        },
        {
          id: 2,
          name: "みなとみらいオフィス",
        },
        {
          id: 3,
          name: "木場オフィス",
        },
      ];

      // Execute
      const res = await request.get("/requests/offices");

      // Assert
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mock);
    });

    it("参照に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(signUpModel, "getAllOffices")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.get("/requests/offices");

      // Assert
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("error", "Failed to get offices");
    });
  });
  describe("post users", () => {
    it("登録に成功したら200のステータスコードを返す。", async () => {
      // Setup
      const reqBody = {
        name: "test1",
        password: "testPassword1",
        officeId: 1,
        floor: "1",
        seat: "1",
        phoneNumber: "xxx-xxx-xxx",
      };

      // Execute
      const res = await request.post("/requests/users").send(reqBody);
      const mock = {
        user_id: res.body[0].user_id,
        user_name: "test1",
        password: "testPassword1",
        office_id: 1,
        floor: "1",
        seat: "1",
        tel_number: "xxx-xxx-xxx",
      };

      // Assert
      expect(res).to.have.status(200);
      const user = await knex
        .select("*")
        .from("user")
        .where("user_id", res.body[0].user_id);
      expect(user[0]).to.deep.equal(mock);
    });

    it("登録に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(signUpModel, "postUserInfo")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.post("/requests/users");

      // Assert
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("error", "Failed to post users");
    });
  });
});
