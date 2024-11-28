const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const createRequestModel = require("../models/createRequestModel");
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

  describe("get items", () => {
    it("参照に成功したら200のステータスコードを返す。", async () => {
      // Setup
      const mock = [
        {
          itemId: 1,
          itemImageName:
            "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu1_onigiri%26tea.png",
          itemName: "おにぎり&お茶",
          maxPrice: 400,
        },
        {
          itemId: 2,
          itemImageName:
            "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu2_onigiri2%26tea.png",
          itemName: "おにぎり×2 & お茶",
          maxPrice: 600,
        },
        {
          itemId: 3,
          itemImageName:
            "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/onigiri.png",
          itemName: "おにぎり",
          maxPrice: 200,
        },
        {
          itemId: 4,
          itemImageName:
            "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/sandwich.png",
          itemName: "サンドイッチ",
          maxPrice: 300,
        },
        {
          itemId: 5,
          itemImageName:
            "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/coffee.png",
          itemName: "コーヒー",
          maxPrice: 200,
        },
        {
          itemId: 6,
          itemImageName:
            "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/tea.png",
          itemName: "お茶",
          maxPrice: 200,
        },
      ];

      // Execute
      const res = await request.get("/requests/items");

      // Assert
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mock);
    });
    it("参照に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(createRequestModel, "getAllItems")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.get("/requests/items");

      // Assert
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("error", "Failed to get items");
    });
  });
  describe("get gratitudes", () => {
    it("参照に成功したら200のステータスコードを返す。", async () => {
      const mock = [
        {
          gratitudeId: 1,
          maxPrice: 150,
        },
        {
          gratitudeId: 2,
          maxPrice: 200,
        },
        {
          gratitudeId: 3,
          maxPrice: 300,
        },
      ];

      // Execute
      const res = await request.get("/requests/gratitudes");

      // Assert
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mock);
    });
    it("参照に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(createRequestModel, "getAllGratitudes")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.get("/requests/gratitudes");

      // Assert
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("error", "Failed to get gratitudes");
    });
  });
  describe("post requests", () => {
    it("登録に成功したら200のステータスコードを返す。", async () => {
      // Setup
      const reqBody = {
        requesterId: 1,
        gratitudeId: 3,
        requesterComment: "nice to meet you!",
        totalMaxPrice: 500,
        itemIds: [1, 2],
      };
      // Execute
      const res = await request.post("/requests/requests").send(reqBody);
      const maxMenuId = await knex("menu").max("menu_id as maxId").first();
      const menuIdObj = await knex
        .select("item_id")
        .from("menu_detail")
        .where("menu_id", maxMenuId.maxId);
      const menuIdArray = menuIdObj.map((value) => {
        return value.item_id;
      });
      const requestObj = await knex
        .select("*")
        .from("request")
        .where("request_id", res.body[0].request_id);
      const mock = {
        request_id: res.body[0].request_id,
        requester_id: 1,
        menu_id: maxMenuId.maxId,
        gratitude_id: 3,
        requester_comment: "nice to meet you!",
      };
      const historyObj = await knex
        .select("*")
        .from("request_status_history")
        .where("request_id", res.body[0].request_id);

      // Assert
      expect(res).to.have.status(200);
      expect(menuIdArray).to.deep.equal(reqBody.itemIds);
      expect(requestObj[0]).to.deep.equal(mock);
      expect(historyObj[0].status_id).to.equal(1);
    });
    it("登録に失敗したら500のステータスコードを返す。", async () => {
      // Setup
      sandbox
        .stub(createRequestModel, "postRequest")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.post("/requests/requests");

      // Assert
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("error", "Failed to post request");
    });
  });
});
