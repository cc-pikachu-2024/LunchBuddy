import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import style from "./style.module.scss";
import clsx from "clsx";
import StatusButton from "../StatusButton";
import { updateRequest } from "../../common/requests";
import { Box } from "@mui/material";

const RequestCard = ({ request, updateRequestList, user }) => {
  const itemList = request.itemList.map((item) => item.itemName);
  const settlement = async () => {
    if (request.responderId == user.id && request.statusId == 2) {
      const res = confirm("精算しましたか？");
      if (res) {
        await updateRequest(
          request,
          updateRequestList,
          3,
          request.responderId,
          false
        );
      }
    }
  };
  return (
    <Box className={clsx(style.RequestCard)} onClick={() => settlement()}>
      <Grid container className={clsx(style.Grid)}>
        <Grid size={9} container className={clsx(style.Grid)}>
          <Grid size={12} className={clsx(style.Grid)}>
            <p className={clsx(style.CustomP)}>
              {request.requesterName} ： {request.requesterFloor} /{" "}
              {request.requesterSeat}
            </p>
          </Grid>
          <Grid size={12} className={clsx(style.Grid)}>
            <p className={clsx(style.CustomP)}>
              買ってきて欲しいもの：{itemList.join(", ")}
            </p>
          </Grid>
          <Grid size={12} className={clsx(style.Grid)}>
            <p className={clsx(style.CustomP)}>
              お礼：〜{request.gratitudeMaxPrice}円
            </p>
          </Grid>
        </Grid>
        <Grid size={3} className={clsx(style.Grid)}>
          <StatusButton
            request={request}
            updateRequestList={updateRequestList}
            user={user}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestCard;

RequestCard.propTypes = {
  request: PropTypes.object,
  updateRequestList: PropTypes.func,
  user: PropTypes.object,
};
