const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const purchaseModel = require("../models/purchaseModel");
const knex = require("../db/knex");
const chaiSubset = require("chai-subset");

chai.use(chaiSubset);
chai.use(chaiHttp);

describe("Purchase API", async () => {
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

  describe("post purchase", () => {
    it("商品購入して明細を送信するとレスポンスとして、purchase_detail_idを返却する（ステータス:200）", async () => {
      const reqBody = {
        requestId: 1,
        responderId: 2,
        recieptId: "xxx",
        itemList: [
          {
            itemName: "おにぎり",
            inputPrice: 100,
            menuFlag: true,
          },
          {
            itemName: "いいおにぎり",
            inputPrice: 150,
            menuFlag: true,
          },
          {
            itemName: "コーヒー",
            inputPrice: 150,
            menuFlag: true,
          },
          {
            itemName: "お菓子",
            inputPrice: 200,
            menuFlag: false,
          },
        ],
      };
      const res = await request.post("/requests/purchase").send(reqBody);

      expect(res).to.have.status(200);

      const dbPurchase = await knex("purchase")
        .select("*")
        .where("purchase_id", 4)
        .first();
      const expectDbPurchase = {
        purchase_id: 4,
        request_id: 1,
        responder_id: 2,
        reciept_id: "xxx",
      };
      expect(dbPurchase).to.deep.equal(expectDbPurchase);

      const dbPurchaseDetail = await knex("purchase_detail")
        .select("*")
        .where("purchase_id", dbPurchase.purchase_id);

      const expectDbPurchaseDetail = [
        {
          purchase_id: 4,
          item_name: "おにぎり",
          input_price: 100,
          menu_flag: true,
        },
        {
          purchase_id: 4,
          item_name: "いいおにぎり",
          input_price: 150,
          menu_flag: true,
        },
        {
          purchase_id: 4,
          item_name: "コーヒー",
          input_price: 150,
          menu_flag: true,
        },
        {
          purchase_id: 4,
          item_name: "お菓子",
          input_price: 200,
          menu_flag: false,
        },
      ];
      expect(dbPurchaseDetail).to.containSubset(expectDbPurchaseDetail);
    });

    it("商品購入時に通信エラーが起きた時、Errorをを返す（ステータス:500）", async () => {
      sandbox
        .stub(purchaseModel, "postPurchase")
        .rejects(new Error("Database Error"));

      const reqBody = {
        requestId: 1,
        responderId: 2,
        recieptId: "xxx",
        itemList: [
          {
            itemName: "おにぎり",
            inputPrice: 100,
            menuFlag: true,
          },
          {
            itemName: "いいおにぎり",
            inputPrice: 150,
            menuFlag: true,
          },
          {
            itemName: "コーヒー",
            inputPrice: 150,
            menuFlag: true,
          },
          {
            itemName: "お菓子",
            inputPrice: 200,
            menuFlag: false,
          },
        ],
      };

      const res = await request.post("/requests/purchase").send(reqBody);

      expect(res).to.have.status(500);
      expect(res.body).to.be.an("object");
    });
  });
});
