import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CustomeStepper from "../customeStepper";
import style from "./style.module.scss";
import StatusButton from "../StatusButton";

const ReceivedRequestCard = ({ request, user, updateRequestList }) => {
  const itemList = request.itemList.map((item) => item.itemName);
  return (
    <Grid container className={style.ReceivedRequestCard}>
      <Grid size={12} display="flex">
        <CustomeStepper isRequester={false} statusId={request.statusId} />
      </Grid>
      <Grid size={6} display="flex">
        <PersonIcon />
        <p className={style.ReceivedRequestCardP}>{request.requesterName}</p>
      </Grid>
      <Grid size={3} display="flex">
        <ApartmentIcon />
        <p className={style.ReceivedRequestCardP}>{request.requesterFloor}</p>
      </Grid>
      <Grid size={3} display="flex">
        <ChairAltIcon />
        <p className={style.ReceivedRequestCardP}>{request.requesterSeat}</p>
      </Grid>
      <Grid size={12} display="flex">
        <LocalDiningIcon />
        <p className={style.ReceivedRequestCardP}>{itemList.join(", ")}</p>
      </Grid>
      <Grid size={12} display="flex">
        <TextsmsIcon />
        <p className={style.ReceivedRequestCardP}>{request.requesterComment}</p>
      </Grid>
      <Grid size={6}>
        <Grid size={12} display="flex">
          <CurrencyYenIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥{request.totalMaxPrice}
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <CardGiftcardIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥{request.gratitudeMaxPrice}
          </p>
        </Grid>
      </Grid>
      <Grid size={6} container direction="column" justifyContent="flex-end">
        <Grid size={12} display="flex">
          <StatusButton
            request={request}
            updateRequestList={updateRequestList}
            user={user}
            color="error"
          />
          <StatusButton
            request={request}
            updateRequestList={updateRequestList}
            user={user}
            color="success"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReceivedRequestCard;

ReceivedRequestCard.propTypes = {
  request: PropTypes.object,
  user: PropTypes.object,
  updateRequestList: PropTypes.func,
};
