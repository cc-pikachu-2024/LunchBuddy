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

  describe("get requestsList", () => {
    it("参照に成功したら200のステータスコードを返す。", async () => {
      // Setup
      const expected = [
        {
          id: 1,
          requesterId: 1,
          requesterName: "山田花子",
          requesterFloor: "12",
          requesterSeat: "S12の柱の横のプーさんのぬいぐるみが置いてある席",
          menuId: 1,
          gratitudeId: 1,
          gratitudeMaxPrice: 150,
          requesterComment: "",
          totalMaxPrice: 400,
          menuDetailId: 1,
          requestStatusHistoryId: 1,
          responderId: null,
          statusId: 1,
          createdAt: "2024-11-22 10:53:18.174+09:00",
          itemList: [
            {
              itemId: 1,
              itemImageName:
                "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu1_onigiri%26tea.png",
              itemName: "おにぎり&お茶",
            },
          ],
        },
        {
          id: 2,
          requesterId: 2,
          requesterName: "田中太郎",
          requesterFloor: "2",
          requesterSeat: "2A-11",
          menuId: 2,
          gratitudeId: 2,
          gratitudeMaxPrice: 200,
          requesterComment: "",
          totalMaxPrice: 600,
          menuDetailId: 2,
          requestStatusHistoryId: 2,
          responderId: null,
          statusId: 1,
          createdAt: "2024-11-22 10:56:18.174+09:00",
          itemList: [
            {
              itemId: 2,
              itemImageName:
                "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu2_onigiri2%26tea.png",
              itemName: "おにぎり×2 & お茶",
            },
          ],
        },
      ];

      // Execute
      const res = await request.get("/requests/requestsList");

      // Assert
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(expected);
    });
    it("参照に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(listRequestsModel, "getAllRequests")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.get("/requests/requestsList");

      // Assert
      expect(res).to.have.status(500);
    });
  });

  describe("get gratitudesSum", () => {
    it("参照に成功したら200のステータスコードを返す。", async () => {
      // Setup
      const expected = { sum: "560" };

      // Execute
      const res = await request.get("/requests//gratitudesSum?userId=1");

      // Assert
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("sum");
      expect(res.body.sum).to.equal(expected.sum);
    });
    it("参照して集計対象がなかったら200のステータスコードと{sum: '0'}を返す。", async () => {
      // Setup
      const expected = { sum: 0 };

      // Execute
      const res = await request.get("/requests//gratitudesSum?userId=2");

      // Assert
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("sum");
      expect(res.body.sum).to.equal(expected.sum);
    });
    it("参照に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(listRequestsModel, "getGratitudesPriceSum")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.get("/requests//gratitudesSum?userId=1");

      // Assert
      expect(res).to.have.status(500);
    });
  });

  describe("post statuses", () => {
    it("登録に成功したら200のステータスコードを返す", async () => {
      // Setup
      // Execute
      // Assert
    });
    it("登録に失敗したら500のステータスコードを返す", async () => {
      // Setup
      // Execute
      // Assert
    });
    it("post responder が想定通りに動作している", async () => {
      // Setup
      // Execute
      // Assert
    });
    it("delete responder が想定通りに動作している", async () => {
      // Setup
      // Execute
      // Assert
    });
  });
});
