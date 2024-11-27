import React from "react";
import { useLocation } from 'react-router-dom';

const RequestDetail = () => {

  //クリックされた値取得
  const location = useLocation();
  const { req } = location.state; 
  console.log(req)

  return <div>RequestDetail</div>;
};

export default RequestDetail;
