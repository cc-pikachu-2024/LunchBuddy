const loginModel = require("../models/loginModel");
const bcrypt = require("bcryptjs");

exports.postLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await loginModel.findByPhoneNumber(phoneNumber);

    if (!user) {
      return res
        .status(401)
        .json({ message: "ユーザーが見つかりませんでした" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // ハッシュ化されたパスワードと比較

    // パスワード照合
    if (!isPasswordValid) {
      return res.status(401).json({ message: "パスワードが一致しません" });
    }

    // 認証成功時のレスポンス
    res.status(200).json({
      loginFlag: true,
      userId: user.user_id,
      userName: user.user_name,
      password: user.password,
      officeId: user.office_id,
      floor: user.floor,
      seat: user.seat,
      phoneNumber: user.tel_number,
    });
    console.log(res.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
