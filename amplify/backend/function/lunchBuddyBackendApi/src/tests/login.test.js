const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../app");
const knex = require("../db/knex");
const loginModel = require("../models/loginModel");
const bcrypt = require("bcrypt");

chai.use(chaiHttp);

describe("Login API", async () => {
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

    // beforeEach(async () => {
    //     await knex("user").insert({
    //         user_name: "testuser",
    //         password: "testpassword",
    //         office_id: 1,
    //         floor: "5",
    //         seat: "A10",
    //         tel_number: '1234567890',
    //     });
    // });

    // afterEach(async () => {
    //     await knex("user").where({ tel_number: '1234567890' }).del();
    // });

    it("ログインに成功したときステータス:200,レスポンスを返却する",async () =>{
        const res = await request.post("/requests/loginUser")
        .send({
            phoneNumber:"111-1111-1111",
            password:"yyy",
        });

            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("loginFlag",true);
            expect(res.body).to.have.property("userId",2);
            expect(res.body).to.have.property("userName","田中太郎");
            expect(res.body).to.have.property("officeId",1);
            expect(res.body).to.have.property("floor","2");
            expect(res.body).to.have.property("seat","2A-11");
            expect(res.body).to.have.property("password","yyy");
    });

    it("存在しない電話番号のときステータス:401,レスポンスを返却する",async () =>{
        const res = await request.post("/requests/loginUser")
        .send({
            phoneNumber:"phone-number",
            password:"yyy",
        });

            expect(res).to.have.status(401);
            expect(res.body).to.have.property("message","ユーザーが見つかりませんでした");
    });

    it("電話番号はあるがPWが一致しないときステータス:401,レスポンスを返却する",async () =>{
        const res = await request.post("/requests/loginUser")
        .send({
            phoneNumber:"111-1111-1111",
            password:"xxx",
        });

            expect(res).to.have.status(401);
            expect(res.body).to.have.property("message","パスワードが一致しません");
    });
}


)


