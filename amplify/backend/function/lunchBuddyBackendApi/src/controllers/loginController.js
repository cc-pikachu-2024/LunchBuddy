const loginModel = require("../models/loginModel");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res) => {
    const { tel, password } = req.body;

        try {
            const user = await loginModel.findByTelNumber(tel);

            if (!tel) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // パスワード照合
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // 認証成功時のレスポンス
            res.status(200).json({
                isAuthenticated: true,
                user_id: user.id,
                user_name: user.user_name,
                office_id: user.office_id,
                floor: user.floor,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
};