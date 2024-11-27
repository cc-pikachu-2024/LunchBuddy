import PropTypes from "prop-types";
import StatusButton from "../StatusButton";
import style from "./style.module.scss";
import Grid from "@mui/material/Grid2";
import CustomeStepper from "../customeStepper";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const RequestMyList = ({ user, requestList, updateRequestList }) => {
  const myRequest = requestList.filter(
    (request) => request.requesterId === user.id
  )[0];

  const displayItemNames = (myRequest) => {
    const itemImagePaths = myRequest.itemList.map((item) => {
      item.itemImageName;
    });
    itemImagePaths.map((itemImagePath) => {
      return <img src={itemImagePath} />;
    });
  };

  const displayItemImages = (myRequest) => {
    const itemImagePaths = myRequest.itemList.map((item) => {
      item.itemImageName;
    });
    itemImagePaths.map((itemImagePath) => {
      return <img src={itemImagePath} />;
    });
  };

  return (
    <>
      {myRequest ? (
        <>
          {console.log(myRequest)}
          <Grid container className={style.RequestMyList}>
            <Grid size={12} display="flex">
              <CustomeStepper
                isRequester={true}
                statusId={myRequest.statusId}
              ></CustomeStepper>
            </Grid>
            <Grid size={3} display="flex">
              <LocalDiningIcon></LocalDiningIcon>
              {myRequest.itemList.map((item) => {
                return <p className={style.myRequestCardP}>{item.itemName}</p>;
              })}
            </Grid>
            <Grid size={3} display="flex">
              <TextsmsIcon></TextsmsIcon>
              <p className={style.myRequestCardP}>
                {myRequest.requesterComment}
              </p>
            </Grid>
            <Grid size={3} display="flex">
              <CurrencyYenIcon></CurrencyYenIcon>
              <p className={style.myRequestCardPWeight}>
                〜￥{myRequest.totalMaxPrice}
              </p>
            </Grid>
            <Grid size={3} display="flex">
              <CardGiftcardIcon></CardGiftcardIcon>
              <p className={style.myRequestCardPWeight}>
                〜￥{myRequest.gratitudeMaxPrice}
              </p>
            </Grid>
            <Grid></Grid>
          </Grid>
          <itemImages displayItemImages={displayItemImages} />
          <StatusButton
            request={myRequest}
            updateRequestList={updateRequestList}
            user={user}
            color="error"
          />
        </>
      ) : (
        <p>現在、依頼はありません</p>
      )}
    </>
  );
};

export default RequestMyList;

RequestMyList.propTypes = {
  user: PropTypes.object,
  requestList: PropTypes.array,
  updateRequestList: PropTypes.func,
};
