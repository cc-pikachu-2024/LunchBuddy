import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import style from "./style.module.scss";
import clsx from "clsx";
import { createButtonStatus } from "./function";

const StatusButton = ({
  request,
  updateRequestList,
  deleteRequestList,
  user,
}) => {
  const buttonContent = createButtonStatus(
    request,
    user,
    deleteRequestList,
    updateRequestList
  );

  return (
    <Button
      variant="contained"
      onClick={buttonContent.onClick}
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
  deleteRequestList: PropTypes.func,
  user: PropTypes.object,
};
