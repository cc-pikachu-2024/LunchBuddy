import { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.scss";

import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

import Grid from "@mui/material/Grid2";
// import RequestDetailStatusButton from "../../components/RequestDetailStatusButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RequestDetail = () => {
  const navigate = useNavigate();

  const mockRequest = {
    id: 6,
    requesterId: 5,
    requesterName: "原三郎",
    requesterFloor: "8",
    requesterSeat: "8F北区画D21",
    menuId: 6,
    gratitudeId: 2,
    gratitudeMaxPrice: 200,
    requesterComment: "何でも大丈夫です！",
    totalMaxPrice: 500,
    menuDetailId: 7,
    requestStatusHistoryId: 8,
    responderId: 1,
    statusId: 3,
    createdAt: "2024-11-22 12:42:18.174+09:00",
    itemList: [
      {
        itemId: 4,
        itemImageName:
          "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/sandwich.png",
        itemName: "サンドイッチ",
      },
      {
        itemId: 5,
        itemImageName:
          "https://lunch-buddy-images.s3.us-east-1.amazonaws.com/coffee.png",
        itemName: "コーヒー",
      },
    ],
  };
  const itemListArray = mockRequest.itemList.map((value) => value);
  console.log(itemListArray);
  const [request] = useState(mockRequest);

  // const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const mockSessionUser = {
    userId: 1,
    userName: "山田花子",
    password: "$2a$10$e7/rjsBndgXa.2/MNtkm0OkqaMrFgrmDPgTnReLX39f8QkhLtSP.G",
    officeId: 1,
    floor: "12",
    seat: "S12の柱の横のプーさんのぬいぐるみが置いてある席",
    phoneNumber: "000-0000-0000",
  };
  const [user] = useState(mockSessionUser);

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
          {request ? request.requesterFloor : "No Data"}
        </p>
      </Grid>
      <Grid size={3} display="flex">
        <ChairAltIcon />
        <p className={style.ReceivedRequestCardP}>
          {request ? request.requesterSeat : "No Data"}
        </p>
      </Grid>
      <Grid size={12} display="flex">
        <LocalDiningIcon />
        <p className={style.ReceivedRequestCardP}>
          {itemListArray.map((value) => value.itemName).join(", ")}
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
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <CardGiftcardIcon />
          <p className={style.ReceivedRequestCardPWeight}>
            〜￥
            {request ? request.gratitudeMaxPrice : "No Data"}
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
    </>
  );
};

export default RequestDetail;
