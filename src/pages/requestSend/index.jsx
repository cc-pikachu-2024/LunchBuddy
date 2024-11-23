import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/customeButton";
import style from "./style.module.scss";
import clsx from "clsx";
import OrderCard from "../../components/orderCard";

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

    //MenuのGET

    // const tempMenuList = [
    //   { item: "おにぎり & お茶", price: 100, image: "image1" },
    //   { item: "おにぎり×2 & お茶", price: 200, image: "image2" },
    //   { item: "おにぎり", price: 300, image: "image3" },
    //   { item: "サンドイッチ", price: 400, image: "image4" },
    //   { item: "コーヒー", price: 500, image: "image5" },
    //   { item: "お茶", price: 600, image: "image6" },
    // ];

    //画像処理(sprint.react参照)

    const fetchMenuList = async() => {
      try {
        const response = await fetch("http://localhost:3000/requests/items");
        const data = await response.json();
        console.log(data);
        setMenuList(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchMenuList();

    //GratitudeのGET
    const tempGratitudeList = [150, 200, 300];

    // const fetchGratitude = async() => {
    //   try {
    //      const response = await fetch("");
    //      const data = await response.json()
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    //fetchGratitude()
    setGratitudeList(tempGratitudeList);
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
      setSelectedGratitude([...selectedGratitude, selected]); //セレクト
    }
  };

  useEffect(() => {

    //メニューの最大金額計算
    const menuPrice = selectedMenu.reduce((acc, menuItem) => {
      if (menuItem) {
        acc += menuItem.price;
      }
      return acc;
    }, 0);

    //お礼の最大金額計算
    const gratitudePrice = selectedGratitude.reduce((acc, gratitude) => {
      if (gratitude) {
        acc += gratitude;
      }
      return acc; 
    }, 0);
    
    setTotalMenuPrice(menuPrice);
    setTotalGratitudePrice(gratitudePrice);
    setTotalPrice(menuPrice + gratitudePrice);

  }, [selectedMenu, selectedGratitude, menuList]);

  
  const sendRequest = async() => {
    console.log("menu", selectedMenu)
    console.log("gratitude", selectedGratitude)

    //リクエストのPost、status更新
    // const param = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8"
    //   },
    //   body: JSON.stringify(selectedMenuとselectedGratitudeのデータ)
    // };
    // const response = await fetch ("", param)

    showRequestList()
  }

  const showRequestList = () => {
    navigate("../requestList")
  }

  return <>
      <h2>メニュー</h2>
      
      <OrderCard
        menuList={ menuList }
        onClick={ selectMenu }
        isMenuSelected={selectedMenu}
      />

      <h2>お礼</h2>

      <OrderCard
        gratitudeList = { gratitudeList }
        onClick={ selectGratitude }
        isGratitudeSelected={selectedGratitude}
      />

      <div className={clsx(style.maxPrice)}>
        <div className={clsx(style.maxPriceTag)}>
          メニュー最大金額 + お礼最大金額 = 合計支払い最大金額
        </div>
        <div className={clsx(style.maxPriceNum)}>
          {totalMenuPrice}円 +  {totalGratitudePrice}円 = {totalPrice}円
        </div>
      </div>

      <Button 
        text="リクエスト登録"
        onClick={sendRequest}
      >
      </Button>
      <Button 
        text="リストへ戻る"
        onClick={showRequestList}
      ></Button>

  </>
};

export default RequestSend;
