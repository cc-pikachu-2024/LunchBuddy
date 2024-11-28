import { useState } from "react";
import CustomeButton from "../../components/customeButton";
import CustomeTextField from "../../components/customeTextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import style from "./style.module.scss";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LunchBuddyIcon from "../../assets/LunchBuddy_icon.png";
import { Box } from "@mui/material";

const Login = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージの状態
  const [open, setOpen] = useState(false); // Snackbarの表示状態
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!phoneNumber || !password) return;

    const loginUser = {
      phoneNumber,
      password,
    };

    try {
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

      try {
        const result = await response.json();
        const { loginFlag, ...userWithoutLoginFlag } = result;
        if (loginFlag === true) {
          sessionStorage.setItem("user", JSON.stringify(userWithoutLoginFlag));
          console.log(userWithoutLoginFlag);
          navigate("/requestList");
        } else {
          throw new Error();
        }
      } catch {
        throw new Error("パスワード認証に失敗しました");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpen(true);
      console.error(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={style.container}>
      <Box
        component="img"
        src={LunchBuddyIcon}
        alt="LunchBuddy Icon"
        className={style.Image}
      />
      <Paper elevation={0} className={style.formContainer}>
        <h1>ログイン</h1>
        <CustomeTextField
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
        <CustomeButton
          text="アカウント登録"
          onClick={() => navigate("/signup")}
        />
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
