const signUpModel = require("../models/signUpModel");

exports.getAllOffices = async (req, res) => {
  try {
    const offices = await signUpModel.getAllOffices();
    const convertedOffices = offices.map((office) => {
      return { id: office.office_id, name: office.office_name };
    });
    res.status(200).json(convertedOffices);
  } catch (err) {
    res.status(500).json({ error: "Failed to get offices" });
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
    const createdUserInfo = await signUpModel.postUserInfo(convertedUserInfo);
    const capitalCasedUserInfo = {
      userId: createdUserInfo[0].user_id,
      userName: createdUserInfo[0].user_name,
      officeId: createdUserInfo[0].office_id,
      floor: createdUserInfo[0].floor,
      seat: createdUserInfo[0].seat,
      telNumber: createdUserInfo[0].tel_number,
    };
    res.status(200).json(capitalCasedUserInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to post users" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userInfo = await signUpModel.getUserInfo(userId);
    const capitalCasedUserInfo = {
      userId: userInfo[0].user_id,
      userName: userInfo[0].user_name,
      officeId: userInfo[0].office_id,
      floor: userInfo[0].floor,
      seat: userInfo[0].seat,
      telNumber: userInfo[0].tel_number,
    };
    res.status(200).json(capitalCasedUserInfo);
  } catch {
    res.status(500).json({ error: "Failed to get users" });
  }
};
