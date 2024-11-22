import React from "react";
import Button from "@mui/material/Button";
import style from "./style.module.scss";
import clsx from "clsx";
import { Typography } from "@mui/material";

const CustomeButton = ({ onClick, status }) => {
  // TODO: DBのstatusと合わせる
  const statuses = {
    0: { text: "任せて！", style: "SuccessColor" },
    1: { text: "進行中", style: "SecondaryColor" },
    2: { text: "取り下げ", style: "ErrorColor" },
    3: { text: "金額確認", style: "InfoColor" },
    4: { text: "金額入力待ち", style: "SuccessSecondaryColor" },
  };
  const text = statuses[status].text || "使用不可";
  const color = statuses[status].style || "GreyColor";
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={clsx(style.Button, style[color])}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default CustomeButton;
