import { updateRequest } from "../../common/requests";

export const createButtonStatus = (request, user, updateRequestList, color) => {
  let isDisplay = true;
  let text = "";
  let onClick = () => {};

  const isRequester = request.requesterId == user.id;
  const isResponder = request?.responderId == user.id;

  switch (request.statusId) {
    case 1: // 状態が「waiting」
      if (request.responderId == null) {
        text = "任せて！";
        onClick = async () => {
          await updateRequest(request, updateRequestList, 2, user.id, false);
        };
      } else if (isRequester) {
        text = "取り下げる";
        onClick = async () => {
          await updateRequest(request, updateRequestList, 5, user.id, false);
        };
      } else {
        isDisplay = false;
      }
      break;
    case 2: // 状態が「progress」
      if (request.responderId == null) {
        isDisplay = false;
      } else if (isRequester) {
        isDisplay = false;
      } else if (isResponder) {
        if (color == "success") {
          text = "金額入力";
          // TODO: 金額入力画面に遷移する挙動に修正
          onClick = async () => {
            const res = confirm("品物を渡しましたか？");
            if (res) {
              await updateRequest(
                request,
                updateRequestList,
                3,
                user.id,
                false
              );
            }
          };
        } else if (color == "error") {
          text = "キャンセル";
          onClick = async () => {
            await updateRequest(request, updateRequestList, 1, user.id, true);
          };
        } else {
          isDisplay = false;
        }
      }
      break;
    case 3: // 状態が「settlement」
      if (request.responderId == null) {
        isDisplay = false;
      } else if (isRequester) {
        text = "金額確認";
        // TODO: 金額確認画面に遷移する挙動に修正
        onClick = async () => {
          const res = confirm("品物を受け取りましたか？");
          if (res) {
            await updateRequest(request, updateRequestList, 4, user.id, false);
          }
        };
      } else if (isResponder) {
        isDisplay = false;
      } else {
        isDisplay = false;
      }
      break;
    default:
      isDisplay = false;
      break;
  }
  return { isDisplay, text, onClick };
};
