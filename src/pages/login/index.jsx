import { useState } from "react";
import CustomeButton from "../../components/customeButton";
import CustomeTextField from "../../components/customeTextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import style from "./style.module.scss";

const Login = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!phoneNumber || !password) return;

    const loginUser = {
      phoneNumber,
      password,
    };

    try {
      console.log("!!!!!!!");
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/loginUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginUser),
        }
      );
      if (!response.ok) {
        throw new Error("ログインに失敗しました");
      }

      console.log("!!!!!!!", response);

      // const result = (await response.json())[0];
      try {
        const result = await response.json();
        console.log("???????", result);
        const { loginFlag, ...userWithoutLoginFlag } = result;
        console.log("!!!!!!!", loginFlag);

        if (loginFlag === true) {
          sessionStorage.setItem("user", JSON.stringify(userWithoutLoginFlag));
          navigate("/requestList");
        } else {
          throw new Error("ログインに失敗しました");
        }
      } catch {
        throw new Error("ログインに失敗しました");
      }
    } catch (error) {
      console.error("ログインに失敗しました:", error);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>LunchBuddy</h1>
      <Paper elevation={0} className={style.formContainer}>
        <h1>ログイン</h1>
        <CustomeTextField
          className={style.textField}
          label="電話番号"
          value={phoneNumber}
          onChange={setPhoneNumber}
          required={true}
        />
        <CustomeTextField
          label="パスワード"
          value={password}
          type="password"
          onChange={setPassword}
          required={true}
        />
        <CustomeButton text="ログイン" onClick={() => handleSubmit()} />
      </Paper>
    </div>
  );
};

export default Login;
