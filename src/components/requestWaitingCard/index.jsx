import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import clsx from "clsx";
import Card from "@mui/material/Card";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Divider } from '@mui/material';

const RequestCard = ({ user, request, updateRequestList }) => {
  
  const navigate = useNavigate();
  const createRequest = (req) => {
    console.log(req)
    navigate("../requestDetail",{state: {req}});
  }


  return (
    <>
      {request && request.map((req, index) => (
          <>
          <Card key={index} className={clsx(style.Card)} onClick={() => createRequest(req)}>
            <div className={clsx(style.UserRow)}>
              <div className={clsx(style.User)}>
                <PersonIcon /> {req.requesterName}
              </div>
              <div className={clsx(style.Office)}>
                <ApartmentIcon />{req.requesterFloor}F
                &emsp;
                <ChairAltIcon /> {req.requesterSeat}
              </div>
            </div>
            <div className={clsx(style.PriceRow)}>
              <div className={clsx(style.FoodItem)}>
                <div>
                  <LocalDiningIcon />
                </div>
                <div>
                  <div className={clsx(style.Item)}>
                    {req.itemList && req.itemList.map(item => item.itemName).join('、')}
                  </div>
                  <div className={clsx(style.Price)}>
                    ~￥{req.itemList && req.itemList.reduce((acc, item) => acc + item.maxPrice, 0)}
                  </div>
                </div>
              </div>

              <div className={clsx(style.GratitudeItem)}>
                <div>
                  <CardGiftcardIcon/>
                </div>
                <div>
                  <div className={clsx(style.Gratitude)}>お礼品</div>
                  <div className={clsx(style.Price)}>~￥{req.gratitudeMaxPrice}</div>
                </div>
              </div>
            </div>
          </Card>
          <Divider lassName={clsx(style.Divider)}></Divider>
          </>
        ))}
    </>
  );
};
export default RequestCard;

RequestCard.propTypes = {
  request: PropTypes.object,
  updateRequestList: PropTypes.func,
  user: PropTypes.object,
};
