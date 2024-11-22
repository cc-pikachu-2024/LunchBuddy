import React from "react";
import Button from "@mui/material/Button";
import style from "./style.module.scss";
import clsx from "clsx";

const CustomeButton = ({ onClick, text }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={clsx(style.Button)}
    >
      {text}
    </Button>
  );
};

export default CustomeButton;
