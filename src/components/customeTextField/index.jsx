import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import style from "./style.module.scss";
import clsx from "clsx";

const CustomeTextFeild = ({
  label,
  value,
  type = "text",
  required = false,
  onChange,
  disabled = false,
  margin = "none",
}) => {
  return (
    <TextField
      label={label}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      size="small"
      className={clsx(style.CustomeTextField)}
      disabled={disabled}
      margin={margin}
    />
  );
};

export default CustomeTextFeild;

CustomeTextFeild.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
