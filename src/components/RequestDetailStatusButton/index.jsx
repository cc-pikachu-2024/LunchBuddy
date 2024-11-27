import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import style from "./style.module.scss";
import clsx from "clsx";
import { createButtonStatus } from "./createButtonStatus";

const StatusButton = ({
  request,
  updateRequestList,
  user,
  color = "success", // "success" か "error" を入力
}) => {
  const buttonContent = createButtonStatus(
    request,
    user,
    updateRequestList,
    color
  );

  const changeContent = (e) => {
    e.stopPropagation();
    buttonContent.onClick();
  };

  return (
    <>
      {buttonContent.isDisplay && (
        <Button
          variant="outlined"
          onClick={changeContent}
          className={clsx(
            color == "success"
              ? style.SuccessStatusButton
              : style.ErrorStatusButton
          )}
        >
          <p
            className={
              color == "success"
                ? style.SuccessCustomeButtonText
                : style.ErrorCustomeButtonText
            }
          >
            {buttonContent.text}
          </p>
        </Button>
      )}
    </>
  );
};

export default StatusButton;

StatusButton.propTypes = {
  request: PropTypes.object,
  updateRequestList: PropTypes.func,
  user: PropTypes.object,
  color: PropTypes.string,
};
