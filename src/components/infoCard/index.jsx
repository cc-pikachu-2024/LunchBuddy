import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import style from "./style.module.scss";
import clsx from "clsx";

const InfoCard = ({ user }) => {
  return (
    <Card className={clsx(style.InfoCard)}>
      <div>今まで獲得したお礼金額</div>
      <div>￥{user.totalGratitude}</div>
    </Card>
  );
};

export default InfoCard;

InfoCard.propTypes = {
  user: PropTypes.object,
};
