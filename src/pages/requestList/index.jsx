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
      const user_id = (
        await fetch(
          `http://localhost:3000/requests/user?name=${sessionUser.user_name}&password=${sessionUser.password}`
        ).then((res) => res.json())
      )?.user_id;
      const totalGratitude = (
        await fetch(
          `http://localhost:3000/requests/gratitudesSum?userId=${user_id}`
        ).then((res) => res.json())
      )?.sum;
      setUser({
        id: user_id,
        totalGratitude,
        ...sessionUser,
      });
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
    // const requests = [
    //   {
    // requestId: 1,
    //     requesterId: 2,
    //     requesterName: "田中太郎",
    //     requesterFloor: "2",
    //     requesterSheet: "トイレの近く",
    //     responderId: 3,
    // menuId: 1,
    // itemList: [{
    //   itemId: 1,
    //   itemImageName: 'xxx',
    //   itemName: 'xxx',
    //   maxPrice: 150
    // },{
    //   itemId: 2,
    //   itemImageName: 'yyy',
    //   itemName: 'yyy',
    //   maxPrice: 150
    // }],
    // gratitudeId: 1,

    //     gratitudePrice: 200,
    // statusId: 0,
    //     purchaseId: 1,
    //     requesterComment: "",
    // createdAt: "2020-19-19",
    //   },
    //   {
    //     id: 2,
    //     requesterId: 1,
    //     requesterName: "山田花子",
    //     requesterFloor: "12",
    //     requesterSheet: "トイレ",
    //     responderId: 2,
    //     menuId: 2,
    //     menu: ["おにぎり", "おにぎり", "お茶"],
    //     gratitudeId: 1,
    //     gratitudePrice: 200,
    //     statusId: 2,
    //     purchaseId: 2,
    //     requesterComment: "",
    //     createdAt: "2020-19-20",
    //   },
    //   {
    //     id: 3,
    //     requesterId: 4,
    //     requesterName: "鈴木じろう",
    //     requesterFloor: "22",
    //     requesterSheet: "トイレのそば",
    //     responderId: 3,
    //     menuId: 3,
    //     menu: ["サンドイッチ"],
    //     gratitudeId: 2,
    //     gratitudePrice: 300,
    //     statusId: 1,
    //     purchaseId: 1,
    //     requesterComment: "",
    //     createdAt: "2020-19-21",
    //   },
    // ];
  }, []);

  const updateRequestList = (id, newRequest) => {
    setRequestList((currentRequestList) => {
      return currentRequestList.map((request) => {
        if (request.id == id) {
          return newRequest;
        } else {
          return request;
        }
      });
    });
  };

  const deleteRequestList = (id) => {
    setRequestList((currentRequestList) => {
      return currentRequestList.filter((request) => request.id != id);
    });
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
            deleteRequestList={deleteRequestList}
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
