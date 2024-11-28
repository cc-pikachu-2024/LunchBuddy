import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/infoCard";
import RequestWaitingCard from "../../components/requestWaitingCard";
import CustomeButton from "../customeButton";
import CreateIcon from "@mui/icons-material/Create";
import clsx from "clsx";
import style from "./style.module.scss";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Grid from "@mui/material/Grid2";

const RequestWaitingList = ({ user, requestList }) => {
  const navigate = useNavigate();
  const createRequest = () => {
    navigate("../requestSend");
  };

  const waitingRequestList = requestList
    .filter((request) => request.statusId === 1)
    .filter((request) => request.requesterId != user.id);

  //フロアが近い順に並べ替え
  const sortedRequestList = waitingRequestList.sort((a, b) => {
    //aのフロアとuserのフロアの距離
    const distanceA = Math.abs(a.requesterFloor - user.floor);
    //bのフロアとuserのフロアの距離
    const distanceB = Math.abs(b.requesterFloor - user.floor);
    return distanceA - distanceB;
  });

  return (
    <>
      <Grid className={style.GridContainer} xs={6} display="flex">
        <VerifiedUserIcon />
        <p className={style.UserName}>{user.name}</p>
        <>さん</>
      </Grid>
      <div className={clsx(style.PageContainer)}>
        <InfoCard user={user}></InfoCard>
        <RequestWaitingCard request={sortedRequestList} />
        <CustomeButton
          fixed
          text={
            <>
              <CreateIcon />
              &emsp;購入を依頼する
            </>
          }
          onClick={createRequest}
        ></CustomeButton>
      </div>
    </>
  );
};

export default RequestWaitingList;

RequestWaitingList.propTypes = {
  user: PropTypes.object,
  requestList: PropTypes.array,
};
