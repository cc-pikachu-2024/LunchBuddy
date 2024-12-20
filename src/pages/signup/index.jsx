import { useEffect, useState } from "react";
import CustomeButton from "../../components/customeButton";
import CustomeTextField from "../../components/customeTextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import style from "./style.module.scss";
import CustomeSelect from "../../components/customeSelect";
import LunchBuddyIcon from "../../assets/LunchBuddy_icon.png";
import { Box } from "@mui/material";

const Signup = () => {
  const [name, setName] = useState(""); //氏名
  const [password, setPassword] = useState(""); //PW
  const [offices, setOffices] = useState([]); // オフィス名のリスト
  const [officeId, setOfficeId] = useState(""); //オフィス名
  const [floor, setFloor] = useState(""); //フロア
  const [seat, setSeat] = useState(""); //座席
  const [phoneNumber, setPhoneNumber] = useState(""); //電話番号

  const navigate = useNavigate();

  const fetchOffices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/offices`
      );
      if (!response.ok) {
        throw new Error("オフィス取得に失敗");
      }
      const data = await response.json();
      setOffices(data);
      if (data.length > 0) {
        setOfficeId(data[0].value);
      }
    } catch (error) {
      console.error("オフィスが0件です:", error);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleSubmit = async () => {
    if (!name) return;

    // TODO: singup用のAPIを叩くように修正
    const newUser = {
      name,
      password,
      officeId,
      floor,
      seat,
      phoneNumber,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (!response.ok) {
        throw new Error("登録に失敗しました");
      }

      const result = await response.json();
      sessionStorage.setItem("user", JSON.stringify(result));
      navigate("/requestList");
    } catch (error) {
      console.error("登録に失敗しました:", error);
    }
  };

  return (
    <div className={style.container}>
      <Box
        component="img"
        src={LunchBuddyIcon}
        alt="LunchBuddy Icon"
        className={style.Image}
      />
      <Paper elevation={4} className={style.formContainer}>
        <h1>アカウント登録</h1>
        <CustomeTextField
          label="氏名"
          value={name}
          onChange={setName}
          required={true}
        />
        <CustomeTextField
          label="パスワード"
          value={password}
          type="password"
          onChange={setPassword}
          required={true}
        />
        <CustomeSelect
          label="オフィス"
          value={officeId || ""}
          targetList={offices}
          required={true}
          onChange={setOfficeId}
        />
        <CustomeTextField
          label="フロア"
          value={floor}
          onChange={setFloor}
          required={true}
        />
        <CustomeTextField
          label="座席"
          value={seat}
          onChange={setSeat}
          required={true}
        />
        <CustomeTextField
          label="電話番号"
          value={phoneNumber}
          onChange={setPhoneNumber}
          required={true}
        />
        <CustomeButton text="登録" onClick={() => handleSubmit()} />
      </Paper>
    </div>
  );
};

export default Signup;
