import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import style from "./style.module.scss";
import clsx from "clsx";

const InfoCard = ({ user }) => {
  return (
    <Card className={clsx(style.InfoCard)}>
      <h2>
        {user.name}さんは今まで{user.totalGratitude}
        円分の
        <br />
        お礼をもらいました。
      </h2>
    </Card>
  );
};

export default InfoCard;

InfoCard.propTypes = {
  user: PropTypes.object,
};
