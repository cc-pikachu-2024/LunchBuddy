import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ReceivedRequestCard from "../receivedRequestCard";
import style from "./style.module.scss";

const ReceivedRequestList = ({ user, requestList, updateRequestList }) => {
  const receivedRequestList = requestList.filter(
    (request) => request.responderId == user.id
  );
  return (
    <Box className={style.ReceivedRequestList}>
      {receivedRequestList.length ? (
        receivedRequestList.map((request) => (
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
