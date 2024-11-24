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
      // TODO: userの情報取得
      console.log(sessionUser);
      // const totalGratitude = (
      //   await fetch(
      //     `http://localhost:3000/requests/gratitudesSum?userId=${user_id}`
      //   ).then((res) => res.json())
      // )?.sum;
      setUser({
        id: 1,
        totalGratitude: 12000,
        ...sessionUser,
      });
      // setUser({
      //   id: user_id,
      //   totalGratitude,
      //   ...sessionUser,
      // });
    })();
  }, []);

  useEffect(() => {
    // TODO: リクエスト情報取得のAPIに置き換え
    // TODO: GET /requests/ は以下の形で欲しいかも
    (async () => {
      const requests = await fetch(
        "http://localhost:3000/requests/requestsList"
      ).then((res) => res.json());
      console.log(requests);
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
