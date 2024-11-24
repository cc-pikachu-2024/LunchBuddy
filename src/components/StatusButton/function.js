export const createButtonStatus = (
  request,
  user,
  deleteRequestList,
  updateRequestList
) => {
  let text;
  let color;
  let onClick;
  const isRequester = request.requesterId == user.id;
  const isResponder = request?.responderId == user.id;
  switch (request.statusId) {
    case 1: // 状態が「waiting」
      if (isRequester) {
        // 「取り下げ」ボタンの想定
        text = "取り下げ";
        color = "ErrorColor";
        onClick = () => {
          // TODO: DBのこのRequestを削除
          deleteRequestList(request.id);
        };
      } else {
        // 「まかせて」ボタンの想定
        text = "まかせて！";
        color = "SuccessColor";
        onClick = () => {
          // TODO: DBで「キャンセル」（想定はid 1）に更新
          const newRequest = {
            ...request,
            statusId: 1,
            responderId: user.id,
          };
          updateRequestList(request.id, newRequest);
        };
      }
      break;
    case 2: // 状態が「progress」
      if (isRequester) {
        // 「金額入力待ち」ボタンの想定
        text = "金額入力待ち";
        color = "SuccessSecondaryColor";
        onClick = () => {
          alert("現在金額入力待ちのリクエストです");
        };
      } else if (isResponder) {
        // 「キャンセル」ボタンの想定
        text = "キャンセル";
        color = "ErrorColor";
        onClick = () => {
          // TODO: DBでstatus_idを0に更新
          // TODO: responder_idは 0 にするか null にするかは議論
          const newRequest = {
            ...request,
            statusId: 0,
            responderId: 0,
          };
          updateRequestList(request.id, newRequest);
        };
      } else {
        // 「進行中」ボタンの想定
        text = "進行中";
        color = "SecondaryColor";
        onClick = () => alert("現在進行中のリクエストです");
      }
      break;
    case 3: // 状態が「settlement」
      if (isRequester) {
        // 「金額確認」ボタンの想定
        // TODO: 「金額確認」ボタンにtext修正
        text = "金額確認";
        color = "InfoColor";
        // TODO: 金額確認画面に遷移する挙動に修正
        // TODO: DBでstatus_idを4に更新
        onClick = () => deleteRequestList(request.id);
      } else if (isResponder) {
        // 「金額確認」ボタンの想定
        // TODO: 「金額確認」ボタンにtext修正
        text = "金額確認待ち";
        color = "InfoColor";
        onClick = () => alert("金額確認待ちです。");
      } else {
        // 「進行中」ボタンの想定
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
