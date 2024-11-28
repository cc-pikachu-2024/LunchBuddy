import PropTypes from "prop-types";
// import Card from "@mui/material/Card";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Grid from "@mui/material/Grid2";
import style from "./style.module.scss";
import clsx from "clsx";

const InfoCard = ({ user }) => {
  return (
    <Grid container className={clsx(style.InfoCard)}>
      <Grid className={style.GridContainer} size={12} display="flex">
        <VerifiedUserIcon />
        <p className={style.InfoCardP}>{user.name}</p>
        <p className={style.InfoCardP}>さん</p>
      </Grid>
      <Grid size={12} display="flex">
        <Grid size={6}>
          <p className={style.InfoCardP}>今まで獲得したお礼金額</p>
        </Grid>
        <Grid size={6}>
          <p className={style.InfoCardP}>￥{user.totalGratitude}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InfoCard;

InfoCard.propTypes = {
  user: PropTypes.object,
};
