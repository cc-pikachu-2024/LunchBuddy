import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import style from "./style.module.scss";

import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

import Grid from "@mui/material/Grid2";
import RequestDetailStatusButton from "../../components/RequestDetailStatusButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RequestDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { req } = location.state;

  const itemListArray = req.itemList.map((value) => value);
  const [request] = useState(req);

  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const [user] = useState(sessionUser);

  return (
    <>
      <button className="back-button" onClick={() => navigate("/requestList")}>
        <ArrowBackIcon />
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
      <Grid size={12} display="flex">
        <LocalDiningIcon />
        <p className={style.ReceivedRequestCardP}>
          {itemListArray
            ? itemListArray.map((value) => value.itemName).join(", ")
            : "No Data"}
          の購入をお願いします。
        </p>
      </Grid>
      <Grid size={12} display="flex">
        <TextsmsIcon />
        <p className={style.ReceivedRequestCardP}>
          {request ? request.requesterComment : "No Data"}
        </p>
      </Grid>
      <Grid size={6}>
        <Grid size={12} display="flex">
          <CurrencyYenIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥{request ? request.totalMaxPrice : "No Data"}
            までで依頼商品を購入してください。
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <CardGiftcardIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥
            {request ? request.gratitudeMaxPrice : "No Data"}
            までのお礼品を購入できます。
          </p>
        </Grid>
      </Grid>
      <div>
        {itemListArray.map((value) => (
          <>
            <img src={value.itemImageName} alt={value.itemName} />
            <div>{value.itemName}</div>
          </>
        ))}
      </div>
      <Grid size={6} container direction="column" justifyContent="flex-end">
        <Grid size={12} display="flex">
          {request.statusId === 1 ? (
            <RequestDetailStatusButton
              request={request}
              user={user}
              color="success"
            />
          ) : (
            "自分の依頼ページへ"
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default RequestDetail;
