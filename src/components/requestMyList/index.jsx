import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import StatusButton from "../StatusButton";
import style from "./style.module.scss";
import CustomeTextField from "../../components/customeTextField";
import CustomeButton from "../customeButton";
import clsx from "clsx";
import CreateIcon from "@mui/icons-material/Create";
import Grid from "@mui/material/Grid2";
import CustomeStepper from "../customeStepper";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box } from "@mui/material";

const RequestMyList = ({ user, requestList, updateRequestList }) => {
  const myRequest = requestList.filter(
    (request) => request.requesterId === user.id && request.statusId !== 4
  )[0];

  const [responder, setResponder] = useState([]); //responderの情報
  const [purchasedItemList, setPurchasedItemList] = useState([]); // responderによる購入商品の情報
  const purchasedMenuList = purchasedItemList.filter(
    (item) => item.menuFlag === true
  );
  const purchasedGratitudeList = purchasedItemList.filter(
    (item) => item.menuFlag === false
  );

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/users/?userId=${
          myRequest.responderId
        }`
      );
      if (!response.ok) {
        throw new Error("ユーザー取得に失敗");
      }
      const data = await response.json();
      setResponder(data);
    } catch (error) {
      console.error("responderがいません:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchPurchasedItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/requests/purchasedItems/?requestId=${
          myRequest.id
        }`
      );
      console.log(response.body);
      if (!response.ok) {
        throw new Error("購入商品リスト取得に失敗");
      }
      const data = await response.json();
      console.log(data);
      setPurchasedItemList(data);
    } catch (error) {
      console.error("購入商品がありません:", error);
    }
  };

  useEffect(() => {
    fetchPurchasedItems();
  }, []);

  const [totalMenuPrice, setTotalMenuPrice] = useState();
  const [totalGratitudePrice, setTotalGratitudePrice] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    //メニューの合計購入金額計算
    const menuPrice = purchasedMenuList.reduce((acc, purchasedItem) => {
      if (purchasedItem) {
        acc += purchasedItem.inputPrice;
      }
      return acc;
    }, 0);

    //お礼の合計購入金額計算
    const gratitudePrice = purchasedGratitudeList.reduce((acc, gratitude) => {
      if (gratitude) {
        acc += gratitude.inputPrice;
      }
      return acc;
    }, 0);

    setTotalMenuPrice(menuPrice);
    setTotalGratitudePrice(gratitudePrice);
    setTotalPrice(menuPrice + gratitudePrice);
  }, [purchasedItemList]);

  // リクエスト作成ボタン
  const navigate = useNavigate();
  const createRequest = () => {
    navigate("../requestSend");
  };

  return (
    <>
      {myRequest ? (
        <>
          <Box className={style.RequestMyList}>
            <Grid size={12}>
              <CustomeStepper
                isRequester={true}
                statusId={myRequest.statusId}
              />
            </Grid>
            <Grid container spacing={2} className={style.myRequestRow}>
              <Grid size={1}>
                <LocalDiningIcon />
              </Grid>
              <Grid size={11}>
                <p className={style.myRequestCardPSmall}>
                  {myRequest.itemList.map((item) => item.itemName).join(" ")}
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={2} className={style.myRequestRow}>
              <Grid size={1}>
                <TextsmsIcon />
              </Grid>
              <Grid size={11}>
                <p className={style.myRequestCardPSmall}>
                  {myRequest.requesterComment || "-"}
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={2} className={style.myRequestRow}>
              <Grid size={1}>
                <CurrencyYenIcon />
              </Grid>
              <Grid size={11}>
                <p className={style.myRequestCardPWeight}>
                  〜￥{myRequest.totalMaxPrice}
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={2} className={style.myRequestRow}>
              <Grid size={1}>
                <CardGiftcardIcon />
              </Grid>
              <Grid size={11}>
                <p className={style.myRequestCardPWeight}>
                  〜￥{myRequest.gratitudeMaxPrice}
                </p>
              </Grid>
            </Grid>
            <Grid size={12} className={style.itemImageGrid}>
              {myRequest.itemList.map((item) => {
                return (
                  <img
                    className={style.itemImage}
                    src={item.itemImageName}
                    alt={item.itemName}
                    key={item.id}
                  />
                );
              })}
            </Grid>
            {myRequest.statusId === 3 ? (
              <>
                <div className={style.horizontalBar}></div>
                <Box>
                  <Grid container spacing={2} className={style.myRequestRow}>
                    <Grid size={1}>
                      <CurrencyYenIcon />
                    </Grid>
                    <Grid size={11}>
                      <p className={style.myRequestCardPWeight}>
                        〜￥{myRequest.totalMaxPrice}
                      </p>
                    </Grid>
                    {purchasedMenuList.map((item) => {
                      return (
                        <Grid
                          size={12}
                          display="flex"
                          className={style.textboxGrid}
                          key={item.id}
                        >
                          <Grid size={6}>
                            <CustomeTextField
                              type="text"
                              value={item.itemName}
                              disabled
                              className={style.itemNameTextbox}
                            />
                          </Grid>
                          <Grid size={6}>
                            <CustomeTextField
                              type="text"
                              value={item.inputPrice}
                              disabled
                              className={style.inputPriceTextBox}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Grid container spacing={2} className={style.myRequestRow}>
                      <Grid size={1}>
                        <CardGiftcardIcon />
                      </Grid>
                      <Grid size={4}>
                        <p className={style.myRequestCardPWeight}>
                          〜￥{myRequest.gratitudeMaxPrice}
                        </p>
                      </Grid>
                      <Grid size={7}>
                        <CustomeTextField
                          type="text"
                          value={totalGratitudePrice}
                          disabled
                          className={style.inputPriceTextBox}
                        />
                      </Grid>
                    </Grid>
                    <Grid size={12} className={clsx(style.MaxPrice)}>
                      <div className={clsx(style.PriceTagHelpIcon)}>
                        <div className={clsx(style.InputPriceTag)}>
                          依頼商品金額
                        </div>
                        <div className={clsx(style.InputPriceTag)}>
                          お礼品金額
                        </div>
                        <div className={clsx(style.InputPriceTag)}>
                          合計金額
                        </div>
                        <div className={clsx(style.Help)}>
                          <HelpOutlineIcon
                            className={clsx(style.HelpIcon)}
                          ></HelpOutlineIcon>
                        </div>
                      </div>
                      <div className={clsx(style.CalculatedPrice)}>
                        <div>{totalMenuPrice}円</div>
                        <div>+{totalGratitudePrice}円</div>
                        <div>={totalPrice}円</div>
                      </div>
                    </Grid>
                    <p>
                      {responder.userName}さんに{totalPrice}
                      円をお支払いください。
                    </p>
                  </Grid>
                </Box>
              </>
            ) : (
              <></>
            )}
            <Grid size={12} justifyContent="center">
              <StatusButton
                request={myRequest}
                updateRequestList={updateRequestList}
                user={user}
                color={myRequest.statusId == 1 ? "error" : "success"}
              />
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <br></br>
          <p>現在、依頼はありません</p>
          <CustomeButton
            fixed
            text={
              <>
                <CreateIcon />
                &emsp;購入を依頼する
              </>
            }
            onClick={createRequest}
          />
        </>
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
