const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const listRequestsModel = require("../models/listRequestsModel");
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
          requesterId: 4,
          requesterName: "鈴木じろう",
          requesterFloor: "22",
          requesterSeat: "22F南トイレの入り口横",
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
              maxPrice: 400,
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
              maxPrice: 600,
            },
          ],
        },
        {
          createdAt: "2024-11-22 14:58:18.174+09:00",
          gratitudeId: 3,
          gratitudeMaxPrice: 300,
          id: 3,
          itemList: [
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
          ],
          menuDetailId: 3,
          menuId: 3,
          requestStatusHistoryId: 14,
          requesterComment: "",
          requesterFloor: "22",
          requesterId: 4,
          requesterName: "鈴木じろう",
          requesterSeat: "22F南トイレの入り口横",
          responderId: 1,
          statusId: 4,
          totalMaxPrice: 500,
        },
        {
          createdAt: "2024-11-22 14:59:18.174+09:00",
          gratitudeId: 3,
          gratitudeMaxPrice: 300,
          id: 4,
          itemList: [
            {
              itemId: 5,
              itemImageName:
                "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/coffee.png",
              itemName: "コーヒー",
              maxPrice: 200,
            },
          ],
          menuDetailId: 5,
          menuId: 4,
          requestStatusHistoryId: 15,
          requesterComment: "",
          requesterFloor: "8",
          requesterId: 5,
          requesterName: "原三郎",
          requesterSeat: "8F北区画D21",
          responderId: 1,
          statusId: 4,
          totalMaxPrice: 200,
        },
        {
          createdAt: "2024-11-22 13:29:18.174+09:00",
          gratitudeId: 3,
          gratitudeMaxPrice: 300,
          id: 5,
          itemList: [
            {
              itemId: 2,
              itemImageName:
                "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/setmenu2_onigiri2%26tea.png",
              itemName: "おにぎり×2 & お茶",
              maxPrice: 600,
            },
          ],
          menuDetailId: 6,
          menuId: 5,
          requestStatusHistoryId: 11,
          requesterComment: "鮭とおかかで",
          requesterFloor: "4",
          requesterId: 3,
          requesterName: "佐藤優子",
          requesterSeat: "5112",
          responderId: 1,
          statusId: 2,
          totalMaxPrice: 600,
        },
        {
          createdAt: "2024-11-22 12:42:18.174+09:00",
          gratitudeId: 2,
          gratitudeMaxPrice: 200,
          id: 6,
          itemList: [
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
          ],
          menuDetailId: 7,
          menuId: 6,
          requestStatusHistoryId: 8,
          requesterComment: "何でも大丈夫です！",
          requesterFloor: "8",
          requesterId: 5,
          requesterName: "原三郎",
          requesterSeat: "8F北区画D21",
          responderId: 1,
          statusId: 3,
          totalMaxPrice: 500,
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
      const expected = { sum: "750" };

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
      const res = await request.get("/requests/gratitudesSum?userId=1");

      // Assert
      expect(res).to.have.status(500);
    });
  });

  describe("post statuses", () => {
    it("登録に成功したら200のステータスコードを返す", async () => {
      // Setup
      const sampleStatus = {
        requestId: 1,
        statusId: 2,
        userId: 2,
      };

      // Execute
      const res = await request.post("/requests/statuses").send(sampleStatus);
      // Assert
      expect(res).to.have.status(200);
    });
    it("登録に成功したらINSERTしたレコードを返す", async () => {
      // Setup
      const sampleStatus = {
        requestId: 1,
        statusId: 2,
        userId: 2,
      };
      // const expected = {
      //   request_history_id: 11,
      //   request_id: 1,
      //   status_id: 2,
      //   status_changed_user_id: 2,
      //   created_at: ここはDBで生成されるため事前には決まらない
      // };

      // Execute
      const res = await request.post("/requests/statuses").send(sampleStatus);

      // Assert
      const historyObj = await knex
        .select("*")
        .from("request_status_history")
        .where("request_id", res.body[0].request_id);
      console.log(historyObj);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("created_at");

      // created_at以外の要素が期待通りであることを確認
      expect(res.body[0].request_history_id).to.deep.equal(16);
      expect(res.body[0].request_id).to.deep.equal(1);
      expect(res.body[0].status_id).to.deep.equal(2);
      expect(res.body[0].status_changed_user_id).to.deep.equal(2);

      // created_atが有効な日時であることを検証
      const createdAt = new Date(res.body[0].created_at);
      expect(createdAt).to.be.an.instanceof(Date);
      expect(createdAt.toString()).to.not.equal("Invalid Date");
    });

    it("登録に失敗したら500のステータスコードを返す", async () => {
      // Setup
      sandbox
        .stub(listRequestsModel, "postStatus")
        .rejects(new Error("Database Error"));

      // Execute
      const res = await request.post("/requests/statuses");

      // Assert
      expect(res).to.have.status(500);
    });

    it("post responder が想定通りに動作している", async () => {
      // Setup
      const sampleStatus = {
        requestId: 1,
        statusId: 2,
        userId: 2,
      };
      const expected = {
        request_id: 1,
        responder_id: 2,
      };

      // Execute
      const res = await request.post("/requests/statuses").send(sampleStatus);

      // Assert
      const responderObj = await knex
        .select("*")
        .from("responder")
        .where("request_id", res.body[0].request_id);

      expect(responderObj[0]).to.deep.equal(expected);
    });

    it("delete responder が想定通りに動作している", async () => {
      // Setup
      const sampleStatus1 = {
        requestId: 1,
        statusId: 2,
        userId: 2,
      };
      const expected1 = {
        request_id: 1,
        responder_id: 2,
      };

      const sampleStatus2 = {
        requestId: 1,
        statusId: 1,
        userId: 2,
        isCancel: true,
      };
      const expected2 = undefined;

      // Execute
      const res1 = await request.post("/requests/statuses").send(sampleStatus1);

      // Assert
      const responderObj1 = await knex
        .select("*")
        .from("responder")
        .where("request_id", res1.body[0].request_id);
      expect(responderObj1[0]).to.deep.equal(expected1);

      // Execute
      const res2 = await request.post("/requests/statuses").send(sampleStatus2);

      // Assert
      const responderObj2 = await knex
        .select("*")
        .from("responder")
        .where("request_id", res2.body[0].request_id);

      expect(responderObj2[0]).to.deep.equal(expected2);
    });
  });
});
