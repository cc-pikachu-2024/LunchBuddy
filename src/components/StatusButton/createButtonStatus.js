import { updateRequest } from "../../common/requests";

export const createButtonStatus = (request, user, updateRequestList) => {
  let text;
  let color;
  let onClick;
  const isRequester = request.requesterId == user.id;
  const isResponder = request?.responderId == user.id;
  switch (request.statusId) {
    case 1: // 状態が「waiting」
      if (isRequester) {
        // 「取り下げ」ボタン
        text = "取り下げ";
        color = "ErrorColor";
        onClick = async () => {
          // status_id を 1 -> 5 に更新
          await updateRequest(request, updateRequestList, 5, null, false);
        };
      } else {
        // 「まかせて」ボタン
        text = "まかせて！";
        color = "SuccessColor";
        onClick = async () => {
          // status_id を 1 -> 2 に更新
          // responder テーブル作成
          await updateRequest(request, updateRequestList, 2, user.id, false);
        };
      }
      break;
    case 2: // 状態が「progress」
      if (isRequester) {
        // 「金額入力待ち」ボタン
        text = "金額入力待ち";
        color = "SuccessSecondaryColor";
        onClick = () => {
          alert("現在金額入力待ちのリクエストです");
        };
      } else if (isResponder) {
        // 「キャンセル」ボタン
        text = "キャンセル";
        color = "ErrorColor";
        onClick = async () => {
          // status_id を 2 -> 1 に更新
          // responder レコード削除
          await updateRequest(
            request,
            updateRequestList,
            1,
            request.responderId,
            true
          );
        };
      } else {
        // 「進行中」ボタン
        text = "進行中";
        color = "SecondaryColor";
        onClick = () => alert("現在進行中のリクエストです");
      }
      break;
    case 3: // 状態が「settlement」
      if (isRequester) {
        // 「金額確認」ボタン
        text = "金額確認";
        color = "InfoColor";
        // TODO: 金額確認画面に遷移する挙動に修正
        // TODO: DBでstatus_idを4に更新
        onClick = async () => {
          const res = confirm("品物を受け取りましたか？");
          if (res) {
            // status_id を 3 -> 4 に更新
            await updateRequest(
              request,
              updateRequestList,
              4,
              request.responderId,
              false
            );
          }
        };
      } else if (isResponder) {
        // 「金額確認待ち」ボタン
        text = "金額確認待ち";
        color = "InfoColor";
        onClick = () => alert("金額確認待ちです。");
      } else {
        // 「進行中」ボタン
        text = "進行中";
        color = "SecondaryColor";
        onClick = () => alert("現在進行中のリクエストです");
      }
      break;
    default:
      text = "-";
      color = "GreyColor";
      onClick = () => {};
      break;
  }
  return { text, color, onClick };
};
