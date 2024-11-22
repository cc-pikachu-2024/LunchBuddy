const signUpModel = require("../models/signUpModel");

exports.getAllOffices = async (req, res) => {
  try {
    const offices = await signUpModel.getAllOffices();
    res.status(200).json(offices);
  } catch (err) {
    console.log(err);
  }
};

exports.postUserInfo = async (req, res) => {
  try {
    // const userInfo = req.body;
    const userInfo = {
      user_id: 1,
      user_name: "taro",
      password: "xxx",
      office_id: 1,
      floor: 10,
      seat: 100,
      tel_number: "xxx-xxx-xxx",
    };
    await signUpModel.postUserInfo(userInfo);
  } catch (err) {
    console.log(err);
  }
};
