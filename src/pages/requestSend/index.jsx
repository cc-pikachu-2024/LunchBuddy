import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/customeButton";
import style from "./style.module.scss";
import clsx from "clsx";
import OrderCard from "../../components/orderCard";
import Grid from "@mui/material/Grid2";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const RequestSend = () => {
  const navigate = useNavigate();

  const [menuList, setMenuList] = useState([])
  const [gratitudeList, setGratitudeList] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [selectedGratitude, setSelectedGratitude] = useState([])
  const [totalMenuPrice, setTotalMenuPrice] = useState()
  const [totalGratitudePrice, setTotalGratitudePrice] = useState()
  const [totalPrice, setTotalPrice] = useState()

  useEffect(() => {

    //todo:画像処理(sprint.react参照)


    const fetchMenuList = async() => {
      try {
        const response = await fetch("http://localhost:3000/requests/items");
        const data = await response.json();
        setMenuList(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchMenuList();
  

    //GratitudeのGET

    const fetchGratitude = async() => {
      try {
         const response = await fetch("http://localhost:3000/requests/gratitudes");
         const data = await response.json();
         setGratitudeList(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGratitude();
  }, []);

  //menuクリック時
  const selectMenu = (selected) => {
    if (selectedMenu.includes(selected)) {
      setSelectedMenu(selectedMenu.filter(item => item !== selected));  //セレクト解除
    } else {
      setSelectedMenu([...selectedMenu, selected]);  //セレクト
    }
  };

  //お礼クリック時
  const selectGratitude = (selected) => {
    if (selectedGratitude.includes(selected)) {
      setSelectedGratitude(selectedGratitude.filter(price => price !== selected)); //セレクト解除
    } else {
      setSelectedGratitude([selected]); //セレクト
    }
  };

  useEffect(() => {

    //メニューの最大金額計算
    const menuPrice = selectedMenu.reduce((acc, menuItem) => {
      if (menuItem) { 
        acc += menuItem.maxPrice;
      }
      return acc;
    }, 0);

    //お礼の最大金額計算
    const gratitudePrice = selectedGratitude.reduce((acc, gratitude) => {
      if (gratitude) {
        acc += gratitude.maxPrice;
      }
      return acc; 
    }, 0);
    
    setTotalMenuPrice(menuPrice);
    setTotalGratitudePrice(gratitudePrice);
    setTotalPrice(menuPrice + gratitudePrice);

  }, [selectedMenu, selectedGratitude, menuList]);

  
  const sendRequest = async() => {
    //リクエストのPost、status更新
// TODO: localStrageに保存したuserIdをセットする。
    const requestBody = {
      userId: "1", 
      gratitudeId: selectedGratitude[0].gratitudeId,
      requesterComment: "テスト",
      totalMaxPrice: totalPrice,
      itemIds: selectedMenu.map(item => item.itemId)
    };

    console.log(requestBody);

    const param = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(requestBody)
    };

    try{
      const response = await fetch("http://localhost:3000/requests/requests", param);
      if (!response.ok) {
        throw new Error("ネットワークに問題があります");
      }
      const data = response.json();
      console.log("作成内容:", data);
      showRequestList();
    }catch(error){
      console.log("リクエスト送信エラー：",error);
    };

  }

  const showRequestList = () => {
    navigate("../requestList")
  }

  return (
    <>
      <div>
        <h2>メニュー</h2>
        <OrderCard
          menuList={menuList}
          onClick={selectMenu}
          isMenuSelected={selectedMenu}
        />
      </div>
      <br></br>
      <div>
        <h2>お礼</h2>
        <OrderCard
          gratitudeList={gratitudeList}
          onClick={selectGratitude}
          isGratitudeSelected={selectedGratitude}
        />
      </div>

      <div className={clsx(style.MaxPrice)}>
        <div className={clsx(style.PriceTagHelpIcon)}>
          <div className={clsx(style.MaxPriceTag)}>
            メニュー金額
          </div>
          <div className={clsx(style.MaxPriceTag)}>
            お礼金額
          </div>
          <div className={clsx(style.MaxPriceTag)}>
            お支払い金額
          </div>
          <div className={clsx(style.Help)}>
            <HelpOutlineIcon className={clsx(style.HelpIcon)}>
            </HelpOutlineIcon>
          </div>
        </div>
        <div className={clsx(style.CalculatedPrice)}>
            <div>
              ~{totalMenuPrice}円 
            </div>
            <div>
              +
            </div>
            <div>
              ~{totalGratitudePrice}円 
            </div>
            <div>
              =
            </div>
            <div>
              ~{totalPrice}円
            </div>
        </div>
      </div>
      <br></br>
      <div>
        <Grid item size={6}>
          <Button text="登録" onClick={sendRequest}></Button>
          <Button text="リストへ戻る" onClick={showRequestList}></Button>
        </Grid>
      </div>
    </>
  );
};

export default RequestSend;