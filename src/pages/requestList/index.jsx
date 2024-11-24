import { useEffect, useState } from "react";
import RequestCard from "../../components/requestCard";
import CustomeButton from "../../components/customeButton";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/infoCard";

const RequestList = () => {
  const [requestList, setRequestList] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 認証基盤（Cognito）を使ったAPIにリプレイス
    // 一旦 sessionStorageに格納しているデータを参照
    (async () => {
      const sessionUser = JSON.parse(sessionStorage.getItem("user"));
      const totalGratitude = (
        await fetch(
          `${import.meta.env.VITE_API_HOST}/requests/gratitudesSum?userId=${
            sessionUser.user_id
          }`
        ).then((res) => res.json())
      )?.sum;
      setUser({
        id: sessionUser.user_id,
        name: sessionUser.user_name,
        office_id: sessionUser.office_id,
        floor: sessionUser.floor,
        totalGratitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const requests = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/requestsList`
      ).then((res) => res.json());
      setRequestList(requests);
    })();
  }, []);

  const updateRequestList = (id, newRequest, isDelete) => {
    if (!isDelete) {
      setRequestList((currentRequestList) => {
        return currentRequestList.map((request) => {
          if (request.id == id) {
            return newRequest;
          } else {
            return request;
          }
        });
      });
    } else {
      setRequestList((currentRequestList) => {
        return currentRequestList.filter((request) => request.id != id);
      });
    }
  };

  return (
    <>
      <h1>おねがいリスト</h1>
      <InfoCard user={user} />
      {requestList?.length ? (
        requestList.map((request) => (
          <RequestCard
            request={request}
            updateRequestList={updateRequestList}
            user={user}
            key={`request-${request.id}`}
          />
        ))
      ) : (
        <p>現在はリクエストがありません。</p>
      )}
      <CustomeButton
        onClick={() => navigate("/requestSend/")}
        text={"リクエスト作成"}
      />
    </>
  );
};

export default RequestList;
