import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ReceivedRequestCard from "../receivedRequestCard";
import style from "./style.module.scss";

  const ReceivedRequestList = ({ user, requestList, updateRequestList }) => {
    //ResponderIdが自分のuserIdと一致し、ステータスが2, 3, 4のリクエストをフィルタリング
    console.log(requestList);
    const filteredRequests = requestList.filter(
      (request) => request.responderId == user.id && (request.statusId === 2 || request.statusId === 3 || request.statusId === 4)
    );
    //ステータスに応じてソート
    const sortedRequests = filteredRequests.sort((a, b) => {
      if (a.statusId === 4 && b.statusId !== 4) return 1;
      if (a.statusId !== 4 && b.statusId === 4) return -1;
      return a.id - b.id;
    });


  return (
    <Box className={style.ReceivedRequestList}>
      {sortedRequests.length ? (
        sortedRequests.map((request) => (
          <ReceivedRequestCard
            request={request}
            user={user}
            updateRequestList={updateRequestList}
            key={`request-${request.id}`}
          />
        ))
      ) : (
        <p>現在受注したリクエストはありません。</p>
      )}
      
    </Box>
  );
};

export default ReceivedRequestList;

ReceivedRequestList.propTypes = {
  user: PropTypes.object,
  requestList: PropTypes.array,
  updateRequestList: PropTypes.func,
};
