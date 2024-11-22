import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import style from "./style.module.scss";
import clsx from "clsx";
import StatusButton from "../StatusButton";

const RequestCard = ({
  request,
  updateRequestList,
  deleteRequestList,
  user,
}) => {
  return (
    <Card className={clsx(style.Card)}>
      <Grid container className={clsx(style.Grid)}>
        <Grid size={9} container className={clsx(style.Grid)}>
          <Grid size={12} className={clsx(style.Grid)}>
            <p className={clsx(style.CustomP)}>
              {request.requesterName} ： {request.requesterFloor} /{" "}
              {request.requesterSheet}
            </p>
          </Grid>
          <Grid size={12} className={clsx(style.Grid)}>
            <p className={clsx(style.CustomP)}>
              買ってきて欲しいもの：{request.menu.join(", ")}
            </p>
          </Grid>
          <Grid size={12} className={clsx(style.Grid)}>
            <p className={clsx(style.CustomP)}>
              お礼：〜{request.gratitudePrice}円
            </p>
          </Grid>
        </Grid>
        <Grid size={3} className={clsx(style.Grid)}>
          <CardActions>
            <StatusButton
              request={request}
              updateRequestList={updateRequestList}
              deleteRequestList={deleteRequestList}
              user={user}
            />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RequestCard;

RequestCard.propTypes = {
  request: PropTypes.object,
  updateRequestList: PropTypes.func,
  deleteRequestList: PropTypes.func,
  user: PropTypes.object,
};
