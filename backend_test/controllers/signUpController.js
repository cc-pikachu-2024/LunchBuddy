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
    const userInfo = req.body;
    const convertedUserInfo = {
      user_name: userInfo.name,
      password: userInfo.password,
      office_id: userInfo.officeId,
      floor: userInfo.floor,
      seat: userInfo.seat,
      tel_number: userInfo.phoneNumber,
    };
    await signUpModel.postUserInfo(convertedUserInfo);
    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
