import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import style from "./style.module.scss";
import clsx from "clsx";

const CustomeButton = ({ onClick, text, fixed = false, buttonColor }) => {

  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={clsx(
        style.Button,
        fixed ? style.FixedButton : style.NotFixedButton,
        buttonColor ? buttonColor : style.Button,
      )}
    >
      {text}
    </Button>
  );
};

export default CustomeButton;

CustomeButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.any,
  fixed: PropTypes.bool,
  buttonColor: PropTypes.string,
};
