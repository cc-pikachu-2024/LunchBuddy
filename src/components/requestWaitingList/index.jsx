import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/infoCard";
import RequestWaitingCard from "../../components/requestWaitingCard";
import CustomeButton from "../customeButton";
import CreateIcon from '@mui/icons-material/Create';
import clsx from "clsx";
import style from "./style.module.scss";



const RequestWaitingList = ({user, requestList, updateRequestList}) => {
  const navigate = useNavigate();
  const createRequest = () => {
    navigate("../requestSend");
  }

  const waitingRequestList = requestList.filter(
    (request) => request.statusId === 1
  );

  return <>
    <div className={clsx(style.PageContainer)}>
      <InfoCard user={user}></InfoCard>
      <RequestWaitingCard user={user} request={waitingRequestList}></RequestWaitingCard>
      <CustomeButton 
        fixed
        text={<><CreateIcon/>&emsp;購入を依頼する</>}
        onClick={createRequest}
      >
        
      </CustomeButton>
    </div>
  </>
};

export default RequestWaitingList;
