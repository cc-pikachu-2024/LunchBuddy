import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import style from "./style.module.scss";
import clsx from "clsx";
import { createButtonStatus } from "./createButtonStatus";

const StatusButton = ({ request, updateRequestList, user }) => {
  const buttonContent = createButtonStatus(request, user, updateRequestList);

  const changeContent = (e) => {
    e.stopPropagation();
    buttonContent.onClick();
  };

  return (
    <Button
      variant="contained"
      onClick={changeContent}
      className={clsx(style.Button, style[buttonContent.color])}
    >
      <p>{buttonContent.text}</p>
    </Button>
  );
};

export default StatusButton;

StatusButton.propTypes = {
  request: PropTypes.object,
  updateRequestList: PropTypes.func,
  user: PropTypes.object,
};
