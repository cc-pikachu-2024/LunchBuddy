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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid2";
import RequestDetailStatusButton from "../../components/RequestDetailStatusButton";

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
      <button className={(clsx(style.BackButton))} onClick={() => navigate("/requestList")}>
        <Grid size={6} display="flex">
          <ArrowBackIcon />
          <p className={style.ReceivedRequestCardP}>受注待ち一覧に戻る</p>
        </Grid>
      </button>

      <Grid size={6} display="flex">
        <PersonIcon />
        <p className={style.ReceivedRequestCardP}>
          {request ? request.requesterName : "No Data"}
        </p>
      </Grid>
      <Grid size={3} display="flex">
        <ApartmentIcon />
        <p className={style.ReceivedRequestCardP}>
          フロア：{request ? request.requesterFloor : "No Data"}
        </p>
      </Grid>
      <Grid size={3} display="flex">
        <ChairAltIcon />
        <p className={style.ReceivedRequestCardP}>
          座席：{request ? request.requesterSeat : "No Data"}
        </p>
      </Grid>
      <Grid xs={6} display="flex">
        <LocalDiningIcon />
        <p className={style.RequestDetailComment}>
          {itemListArray
            ? itemListArray.map((value) => value.itemName).join(", ")
            : "No Data"}
          の購入をお願いします。
        </p>
      </Grid>
      <Grid xs={6} display="flex">
        <TextsmsIcon />
        <p className={style.ReceivedRequestCardP}>
          {request ? request.requesterComment : "No Data"}
        </p>
      </Grid>
      <Grid xs={6}>
        <Grid xs={6} display="flex">
          <CurrencyYenIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥{request ? request.totalMaxPrice : "No Data"}
            までで依頼商品を購入してください。
          </p>
        </Grid>
        <Grid xs={6} display="flex">
          <CardGiftcardIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥
            {request ? request.gratitudeMaxPrice : "No Data"}
            までのお礼品を購入できます。
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
    </>
  );
};

export default RequestDetail;
