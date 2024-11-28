import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "./style.module.scss";
import StatusButton from "../../components/StatusButton";
// import CustomeTextField from "../../components/customeTextField";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CustomeStepper from "../../components/customeStepper";
import clsx from "clsx";
import Grid from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const PurchasingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, request } = location.state || {};
  // const [purchasedItemList, setPurchasedItemList] = useState([]); // responderによる購入商品の情報
  const [purchasedMenuList, setPurchasedMenuList] = useState([]);
  const [purchasedGratitudeList, setPurchasedGratitudeList] = useState([]);

  const [totalMenuPrice, setTotalMenuPrice] = useState();
  const [totalGratitudePrice, setTotalGratitudePrice] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    //メニューの合計購入金額計算　//この辺りの実装全然ダメなはずなので要修正
    const menuPrice = purchasedMenuList.reduce((acc, purchasedItem) => {
      return Number(Object.values(purchasedItem)[0]);
    }, 0);

    //お礼の合計購入金額計算
    const gratitudePrice = purchasedGratitudeList.reduce((acc, gratitude) => {
      return Number(gratitude["gratitude"]);
    }, 0);
    setTotalMenuPrice(menuPrice);
    setTotalGratitudePrice(gratitudePrice);
    setTotalPrice(menuPrice + gratitudePrice);
  }, [purchasedMenuList, purchasedGratitudeList]);

  useEffect(() => {
    const itemList = purchasedMenuList.concat(purchasedGratitudeList);
    setPurchasedItemList(itemList);
  }, [purchasedMenuList, purchasedGratitudeList]);

  const handleItemPriceChange = (target) => {
    const { name, value } = target;
    console.log(name, value);
    setPurchasedMenuList((prevValues) => [...prevValues, [name]]);
    // setPurchasedMenuList((prevValues) => [...prevValues, { [name]: value }]);
  };

  const handleGratitudePriceChange = (target) => {
    const { name, value } = target;
    console.log(name, value);
    setPurchasedGratitudeList((prevValues) => [
      ...prevValues,
      { [name]: value },
    ]);
  };

  // >>>>>>>>>>>>>>>>>>>
  const [purchasedItem, setPurchasedItem] = useState([]); // responderによる購入商品の情報

  useEffect(() => {
    console.log(request);
    const purchasedObj = request.itemList.map((item, idx) => {
      return {
        tmpId: idx,
        itemName: item.itemName,
        maxPrice: item.maxPrice,
        menuFlag: true,
        inputPrice: 0,
        itemImageName: item.itemImageName,
      };
    });
    setPurchasedItem(purchasedObj);
  }, []);

  const updateInputPrice = (value, id) => {
    setPurchasedItem((currentPurchasedItem) => {
      return currentPurchasedItem.map((purchase) => {
        if (request.id == id) {
          return newRequest;
        } else {
          return request;
        }
      });
    });
  };

  const sendPurchaseDetail = async () => {
    const res = confirm("金額に誤りはありませんか？");
    if (res) {
      const newItemList = Object.entries(purchasedItemList).map(
        ([key, value]) => ({
          itemName: key,
          inputPrice: value,
          menuFlag: key == "gratitude" ? false : true,
        })
      );
      const requestBody = {
        requestId: request.id,
        responderId: request.responderId,
        recieptId: "xxx", //TODO: レシートアップロード機能の追加
        itemList: newItemList,
      };
      console.log(newItemList);
      console.log(requestBody);

      // const param = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json; charset=utf-8",
      //   },
      //   body: JSON.stringify(requestBody),
      // };

      // try {
      //   const response = await fetch(
      //     `${import.meta.env.VITE_API_HOST}/requests/purchase`,
      //     param
      //   );
      //   if (!response.ok) {
      //     throw new Error("ネットワークに問題があります");
      //   }
      //   const data = response.json();
      //   console.log("作成内容:", data);
      //   navigate("/requestList");
      // } catch (error) {
      //   console.log("リクエスト送信エラー：", error);
      // }
    }
  };

  return (
    <>
      <Grid container className={style.RequestMyList}>
        <Grid size={12} display="flex">
          <CustomeStepper isRequester={true} statusId={request.statusId} />
        </Grid>
        <Grid size={12} display="flex">
          <PersonIcon />
          <p className={style.ReceivedRequestCardPLarge}>
            {request.requesterName}
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <ApartmentIcon />
          <p className={style.ReceivedRequestCardP}>
            フロア：{request.requesterFloor}F
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <ChairAltIcon />
          <p className={style.ReceivedRequestCardP}>
            座席：{request.requesterSeat}
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <LocalDiningIcon />
          {request.itemList.map((item) => {
            return <p className={style.myRequestCardP}>{item.itemName}</p>;
          })}
        </Grid>
        <Grid size={12} display="flex">
          <TextsmsIcon />
          <p className={style.myRequestCardP}>{request.requesterComment}</p>
        </Grid>
        <Grid size={12} display="flex">
          <CurrencyYenIcon />
          <p className={style.myRequestCardPWeight}>
            〜￥{request.totalMaxPrice}までで依頼商品を購入してください。
          </p>
        </Grid>
        <Grid size={12} display="flex">
          <CardGiftcardIcon />
          <p className={style.myRequestCardPWeight}>
            〜￥{request.gratitudeMaxPrice}までのお礼品を購入できます。
          </p>
        </Grid>
        <Grid size={12} className={style.itemImageGrid}>
          {request.itemList.map((item) => {
            return (
              <img
                className={style.itemImage}
                src={item.itemImageName}
                alt={item.itemName}
              />
            );
          })}
        </Grid>
        <div className={style.horizontalBar}></div>
        <Grid>
          <Grid size={12}>
            <Grid size={12} display="flex">
              <CurrencyYenIcon />
              <p className={style.myRequestCardPWeight}>
                〜￥{request.totalMaxPrice}
              </p>
            </Grid>
            {purchasedItem.map((item) => {
              return (
                <Grid
                  size={12}
                  display="flex"
                  className={style.textboxGrid}
                  key={item.tmpId}
                >
                  {/* <CustomeTextField
                    type="text"
                    value={item.itemName}
                    disabled
                    className={style.itemNameTextbox}
                    key="itemName"
                  /> */}
                  <TextField
                    label=""
                    value={item.itemName}
                    type="text"
                    required={true}
                    size="small"
                    className={clsx(style.itemNameTextbox)}
                    margin={"none"}
                    disabled
                    name={item.itemName}
                  />
                  {/* <CustomeTextField
                    type="text"
                    className={style.inputPriceTextBox}
                    name={item.itemName}
                    onChange={handleItemPriceChange}
                  /> */}
                  <TextField
                    label=""
                    value={item.inputPrice}
                    type="number"
                    onChange={(e) => updateInputPrice(e.target.target)}
                    required={true}
                    size="small"
                    className={clsx(style.inputPriceTextBox)}
                    margin={"none"}
                    name={item.itemName}
                  />
                </Grid>
              );
            })}
            <Grid size={12} display="flex">
              <Grid size={4} display="flex">
                <CardGiftcardIcon />
                <p className={style.myRequestCardPWeight}>
                  〜￥{request.gratitudeMaxPrice}
                </p>
              </Grid>
              <Grid size={8}>
                {/* <CustomeTextField
                  type="text"
                  className={style.inputPriceTextBox}
                  name="gratitude" //ここは固定でいい？
                  onChange={handleGratitudePriceChange}
                /> */}
                <TextField
                  label=""
                  value={purchasedGratitudeList["gratitude"]}
                  type="text"
                  onChange={(e) => handleGratitudePriceChange(e.target)}
                  required={true}
                  size="small"
                  className={clsx(style.inputPriceTextBox)}
                  margin={"none"}
                  name={"gratitude"}
                />
              </Grid>
            </Grid>
            <div className={clsx(style.MaxPrice)}>
              <div className={clsx(style.PriceTagHelpIcon)}>
                <div className={clsx(style.InputPriceTag)}>依頼商品金額</div>
                <div className={clsx(style.InputPriceTag)}>お礼品金額</div>
                <div className={clsx(style.InputPriceTag)}>合計金額</div>
                <div className={clsx(style.Help)}>
                  <HelpOutlineIcon
                    className={clsx(style.HelpIcon)}
                  ></HelpOutlineIcon>
                </div>
              </div>
              <div className={clsx(style.CalculatedPrice)}>
                <div>{totalMenuPrice}円</div>
                <div>+　{totalGratitudePrice}円</div>
                <div>=　{totalPrice}円</div>
              </div>
            </div>
          </Grid>
          <Grid size={12} justifyContent="center">
            <p>
              {request.requesterName}さんに{totalPrice}円の明細を送付します。
            </p>
            {/* <StatusButton
              request={request}
              user={user}
              color="success"
              onClick={sendPurchaseDetail}
            /> */}
            <Button
              variant="outlined"
              onClick={() => sendPurchaseDetail()}
              className={style.SuccessStatusButton}
            >
              <p className={style.SuccessCustomeButtonText}>明細送付</p>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PurchasingDetail;
