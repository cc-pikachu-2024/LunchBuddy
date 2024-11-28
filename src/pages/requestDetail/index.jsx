import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import style from "./style.module.scss";
import clsx from "clsx";

import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid2";
import RequestDetailStatusButton from "../../components/RequestDetailStatusButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Box } from "@mui/material";

const RequestDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { req } = location.state;

  const itemListArray = req.itemList.map((value) => value);
  const [request] = useState(req);

  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const [user] = useState(sessionUser);

  const [isPushed, setIsPushed] = useState(false);

  return (
    <>
      <Box className={style.Header}>
        <Button
          onClick={() => navigate("/requestList")}
          className={clsx(style.BackButton)}
        >
          <ArrowBackIosNewIcon />
        </Button>
        <h2 className={style.PageTitle}>リクエスト詳細</h2>
      </Box>
      <Box className={style.DetailContent}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <PersonIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>依頼者</p>
            <p className={style.ReceivedRequestCardP}>
              {request ? request.requesterName : "No Data"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <ApartmentIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>フロア</p>
            <p className={style.ReceivedRequestCardP}>
              {request ? request.requesterFloor : "No Data"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <ChairAltIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>座席</p>
            <p className={style.ReceivedRequestCardP}>
              {request ? request.requesterSeat : "No Data"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <LocalDiningIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>
              以下の商品を購入してください。
            </p>
            <p className={style.RequestDetailComment}>
              {itemListArray
                ? itemListArray.map((value) => value.itemName).join(", ")
                : "No Data"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <TextsmsIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>コメント</p>
            <p className={style.ReceivedRequestCardP}>
              {request.requesterComment ? request.requesterComment : "-"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <CurrencyYenIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>
              以下金額で依頼商品を購入してください。
            </p>
            <p className={style.ReceivedRequestCardPWeight}>
              {request.totalMaxPrice ? `〜￥${request.totalMaxPrice}` : "-"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <CardGiftcardIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>
              以下金額でお礼品を購入できます。
            </p>
            <p className={style.ReceivedRequestCardPWeight}>
              {request.gratitudeMaxPrice
                ? `〜￥${request.gratitudeMaxPrice}`
                : "-"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {itemListArray.map((value) => (
            <Grid item xs={6} key={value.itemName} justifyContent="center">
              <img
                className={clsx(style.image)}
                src={value.itemImageName}
                alt={value.itemName}
              />
              <div>{value.itemName}</div>
            </Grid>
          ))}
        </Grid>
        {isPushed == false ? (
          <Grid xs={6} container justifyContent="center">
            <RequestDetailStatusButton
              request={request}
              user={user}
              color="success"
              setIsPushed={setIsPushed}
            />
          </Grid>
        ) : (
          <Grid xs={6} container justifyContent="center">
            <p className={style.ReceivedRequestCardPWeight}>
              依頼を引き受けました
            </p>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default RequestDetail;
