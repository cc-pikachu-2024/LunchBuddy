import { useState, useEffect } from "react";
import InfoCard from "../../components/infoCard";
import RequestCard from "../../components/requestCard";


const RequestWaitingList = ({user, requestList, updateRequestList}) => {

  return <>
      <InfoCard user={user}></InfoCard>
      <RequestCard user={user} request={requestList} updateRequestList={updateRequestList}></RequestCard>
  </>
};

export default RequestWaitingList;
