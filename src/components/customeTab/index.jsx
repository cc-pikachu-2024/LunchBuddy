import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const CustomeTab = (props) => {
  const { children } = props;
  const [value, setValue] = useState(0);


  //tab情報が渡されたらそのtabに遷移
  useEffect(() => {
    if (props) {
      setValue(props.tab)
    }
  },[props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={style.CustomeTabBox}>
      <Box className={style.CustomeTabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="受注待ち" {...a11yProps(0)} />
          <Tab label="自分の依頼" {...a11yProps(1)} />
          <Tab label="受注した依頼" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {children[0]}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {children[1]}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {children[2]}
      </CustomTabPanel>
    </Box>
  );
};

export default CustomeTab;

CustomeTab.propTypes = {
  children: PropTypes.array,
};
