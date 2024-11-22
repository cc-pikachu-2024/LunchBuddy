import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import StatusButton from "../StatusButton";

const RequestCard = ({
  user,
  floor,
  sheet,
  wants,
  reward,
  status,
  onClick,
}) => {
  return (
    <Card>
      <Grid container spacing={1}>
        <Grid size={9} container>
          <Grid size={12}>
            <Typography>
              {user} ： {floor} / {sheet}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography>買ってきて欲しいもの：{wants.join(", ")}</Typography>
          </Grid>
          <Grid size={12}>
            <Typography>お礼：〜{reward}円</Typography>
          </Grid>
        </Grid>
        <Grid size={3}>
          <CardActions>
            <StatusButton onClick={onClick} status={status} />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RequestCard;
