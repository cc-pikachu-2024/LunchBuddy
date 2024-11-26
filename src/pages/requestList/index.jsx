import { useEffect, useState } from "react";
import CustomeTab from "../../components/customeTab";
import ReceivedRequestList from "../../components/receivedRequestList";
import RequestMyList from "../../components/requestMyList";
import RequestWaitingList from "../../components/requestWaitingList";

const RequestList = () => {
  const [requestList, setRequestList] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    // TODO: 認証基盤（Cognito）を使ったAPIにリプレイス
    // 一旦 sessionStorageに格納しているデータを参照
    (async () => {
      const sessionUser = JSON.parse(sessionStorage.getItem("user"));
      console.log("sessionUser:" ,sessionUser);
      const totalGratitude = (
        await fetch(
          `${import.meta.env.VITE_API_HOST}/requests/gratitudesSum?userId=${
            sessionUser.userId
          }`
        ).then((res) => res.json())
      )?.sum;
      setUser({
        id: sessionUser.userId,
        name: sessionUser.userName,
        office_id: sessionUser.officeId,
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
      <CustomeTab>
        <RequestWaitingList
          user={user}
          requestList={requestList}
          updateRequestList={updateRequestList}
        />
        <RequestMyList
          user={user}
          requestList={requestList}
          updateRequestList={updateRequestList}
        />
        <ReceivedRequestList
          user={user}
          requestList={requestList}
          updateRequestList={updateRequestList}
        />
      </CustomeTab>
      {/* <h1>おねがいリスト</h1>
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
        fixed={true}
      /> */}
    </>
  );
};

export default RequestList;
