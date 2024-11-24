const signUpModel = require("../models/signUpModel");

exports.getAllOffices = async (req, res) => {
  try {
    const offices = await signUpModel.getAllOffices();
    convertedOffices = offices.map((office) => {
      return { id: office.office_id, name: office.office_name };
    });
    res.status(200).json(convertedOffices);
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
    const createdUserInfo = await signUpModel.postUserInfo(convertedUserInfo);
    res.status(200).json(createdUserInfo);
  } catch (err) {
    console.log(err);
  }
};
