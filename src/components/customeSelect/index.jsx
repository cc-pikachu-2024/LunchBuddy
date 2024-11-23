import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import style from "./style.module.scss";

const CustomeSelect = ({
  label,
  value,
  targetList,
  required = false,
  onChange,
}) => {
  return (
    <FormControl
      required={required}
      size="small"
      className={style.CustomeSelectFormControl}
      variant="outlined"
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        className={style.CustomeSelect}
      >
        <MenuItem value="">
          <em>選択してください</em>
        </MenuItem>
        {targetList.map((target) => (
          <MenuItem key={target.id} value={target.id}>
            {target.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomeSelect;

CustomeSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  targetList: PropTypes.array,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};
