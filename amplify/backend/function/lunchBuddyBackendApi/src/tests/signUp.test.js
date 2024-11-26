const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const signUpModel = require("../models/signUpModel");
// const listRequestsModel = require("../models/listRequestsModel");
// const createRequestModel = require("../models/createRequestModel");
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

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

  beforeEach(async function ()  {
    this.timeout(5000);
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
    xit("参照に成功したら200のステータスコードを返す。", async () => {
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

    xit("参照に失敗したら500のステータスコードを返す。", async () => {
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

      // Assert
    const res = await request.post("/requests/users").send(reqBody);
    expect(res).to.have.status(200);
    const createdUser = res.body[0];
    const isPasswordMatch = await bcrypt.compare(reqBody.password, createdUser.password); // ハッシュ化されたパスワードとの比較
    expect(createdUser).to.include({
      user_name: reqBody.name,
      office_id: reqBody.officeId,
      floor: reqBody.floor,
      seat: reqBody.seat,
      tel_number: reqBody.phoneNumber,
    });

    expect(isPasswordMatch).to.be.true;
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
