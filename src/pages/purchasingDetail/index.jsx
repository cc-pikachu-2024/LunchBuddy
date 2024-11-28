import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import style from "./style.module.scss";
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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box } from "@mui/material";

const PurchasingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { _, request } = location.state || {};
  // >>>>>>>>>>>>>>>>>>>
  const [gratitude, setGratitude] = useState({
    itemName: "gratitude",
    maxPrice: request.gratitudeMaxPrice,
    menuFlag: false,
    inputPrice: 0,
    itemImageName: "",
  });
  const [purchasedItem, setPurchasedItem] = useState(
    request.itemList.map((item, idx) => {
      return {
        tmpId: idx,
        itemName: item.itemName,
        maxPrice: item.maxPrice,
        menuFlag: true,
        inputPrice: 0,
        itemImageName: item.itemImageName,
      };
    })
  ); // responderによる購入商品の情報

  const [totalMenuPrice, setTotalMenuPrice] = useState(0);
  const [totalGratitudePrice, setTotalGratitudePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalMenuPrice(
      purchasedItem.reduce((sum, item) => {
        return Number(sum) + Number(item.inputPrice);
      }, 0)
    );
    setTotalGratitudePrice(Number(gratitude.inputPrice));
  }, [gratitude, purchasedItem]);

  useEffect(() => {
    setTotalPrice(Number(totalMenuPrice + totalGratitudePrice));
  }, [totalMenuPrice, totalGratitudePrice]);

  const updateInputPrice = (value, id) => {
    setPurchasedItem((currentPurchasedItem) => {
      return currentPurchasedItem.map((purchase) => {
        if (purchase.tmpId == id) {
          return { ...purchase, inputPrice: value };
        } else {
          return purchase;
        }
      });
    });
  };

  const updateGratitudePrice = (value) => {
    setGratitude((currentGratitude) => {
      return { ...currentGratitude, inputPrice: value };
    });
  };

  const sendPurchaseDetail = async () => {
    const res = confirm("金額に誤りはありませんか？");
    if (res) {
      const newItemList = purchasedItem.map((item) => ({
        itemName: item.itemName,
        inputPrice: Number(item.inputPrice),
        menuFlag: item.menuFlag,
      }));
      newItemList.push({
        itemName: gratitude.itemName,
        inputPrice: gratitude.inputPrice,
        menuFlag: gratitude.menuFlag,
      });
      const requestBody = {
        requestId: request.id,
        responderId: request.responderId,
        recieptId: "xxx", //TODO: レシートアップロード機能の追加
        itemList: newItemList,
      };
      console.log(requestBody);

      const param = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(requestBody),
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_HOST}/requests/purchase`,
          param
        );
        if (!response.ok) {
          throw new Error("ネットワークに問題があります");
        }
        const data = response.json();
        console.log("作成内容:", data);
        navigate("/requestList");
      } catch (error) {
        console.log("リクエスト送信エラー：", error);
      }
    }
  };

  return (
    <>
      <Box className={style.Header}>
        <Button className={clsx(style.BackButton)}>
          <Link
            to={"/requestList"}
            state={{ activeTab: 2 }}
            className={clsx(style.BackButtonLink)}
          >
            <ArrowBackIosNewIcon />
          </Link>
        </Button>
        <h2 className={style.PageTitle}>金額入力</h2>
      </Box>
      <Box className={style.DetailContent}>
        <Grid size={12} display="flex">
          <CustomeStepper isRequester={true} statusId={request.statusId} />
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <PersonIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>依頼者</p>
            <p className={style.ReceivedRequestCardPLarge}>
              {request.requesterName}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <ApartmentIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>フロア</p>
            <p className={style.ReceivedRequestCardP}>
              {request.requesterFloor}F
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <ChairAltIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>座席</p>
            <p className={style.ReceivedRequestCardP}>
              {request.requesterSeat}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <LocalDiningIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>依頼品</p>
            {purchasedItem.map((item) => (
              <p className={style.ReceivedRequestCardPLarge} key={item.tmpId}>
                {item.itemName}
              </p>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <TextsmsIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>コメント</p>
            <p className={style.ReceivedRequestCardPSmall}>
              {request.requesterComment || "-"}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <CurrencyYenIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>
              以下金額で依頼商品を購入してください。
            </p>
            <p className={style.ReceivedRequestCardPLarge}>
              〜￥{request.totalMaxPrice}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={1}>
            <CardGiftcardIcon />
          </Grid>
          <Grid size={11}>
            <p className={style.ReceivedRequestCardPSmall}>
              以下金額でお礼品を購入できます。
            </p>
            <p className={style.ReceivedRequestCardPLarge}>
              〜￥{request.gratitudeMaxPrice}
            </p>
          </Grid>
        </Grid>
        <Grid size={12} className={style.itemImageGrid}>
          {request.itemList.map((item) => {
            return (
              <img
                className={style.itemImage}
                src={item.itemImageName}
                alt={item.itemName}
                key={item.tmpId}
              />
            );
          })}
        </Grid>
        <div className={style.horizontalBar}></div>
        <Box>
          <Grid size={12}>
            <Grid size={12} display="flex">
              <CurrencyYenIcon />
              <p className={style.ReceivedRequestCardPLarge}>
                〜￥{request.totalMaxPrice}
              </p>
            </Grid>
            {purchasedItem.map((item, idx) => (
              <Grid
                container
                display="flex"
                className={style.textboxGrid}
                key={item.tmpId}
              >
                <Grid size={8}>
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
                </Grid>
                <Grid size={4}>
                  <TextField
                    label=""
                    value={item.inputPrice}
                    type="number"
                    onChange={(e) => updateInputPrice(e.target.value, idx)}
                    required={true}
                    size="small"
                    className={clsx(style.inputPriceTextBox)}
                    margin={"none"}
                    name={item.itemName}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid size={12}>
              <Grid size={12} display="flex">
                <CardGiftcardIcon />
                <p className={style.ReceivedRequestCardPLarge}>
                  〜￥{request.gratitudeMaxPrice}
                </p>
              </Grid>
              <Grid container display="flex" className={style.textboxGrid}>
                <Grid size={8}>
                  <TextField
                    label=""
                    value={"お礼品"}
                    type="text"
                    size="small"
                    className={clsx(style.itemNameTextbox)}
                    margin={"none"}
                    disabled
                    name={"お礼品"}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label=""
                    value={gratitude.inputPrice}
                    type="text"
                    onChange={(e) => updateGratitudePrice(e.target.value)}
                    required={true}
                    size="small"
                    className={clsx(style.inputPriceTextBox)}
                    margin={"none"}
                    name={"gratitude"}
                  />
                </Grid>
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
            <Button
              variant="outlined"
              onClick={() => sendPurchaseDetail()}
              className={style.SuccessStatusButton}
            >
              <p className={style.SuccessCustomeButtonText}>明細送付</p>
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PurchasingDetail;
