import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import style from "./style.module.scss";
import clsx from "clsx";
import StatusButton from "../StatusButton";
import { updateRequest } from "../../common/requests";
import Card from "@mui/material/Card";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Divider } from '@mui/material';

const RequestCard = ({ request, updateRequestList, user }) => {
  console.log(user);
  console.log(request);
  console.log(updateRequestList);

  return (
    <>
      {request &&
        request.map((req, index) => (
          <>
          <Card key={index} className={clsx(style.Card)}>
            <div className={clsx(style.UserRow)}>
              <div className={clsx(style.User)}>
                <PersonIcon /> {req.requesterName}
              </div>
              <div className={clsx(style.Office)}>
                <ApartmentIcon /> {req.requesterFloor}F
                <ChairAltIcon /> {req.requesterSeat}
              </div>
            </div>
            <div className={clsx(style.PriceRow)}>
              <div>
                {req.itemList &&
                  req.itemList.map((item, index) => (
                    <div key={index} className={clsx(style.FoodItem)}>
                      <div>
                        <LocalDiningIcon />
                      </div>
                      <div>
                        <div className={clsx(style.Item)}>{item.itemName}</div>
                        <div className={clsx(style.Price)}>~￥{req.totalMaxPrice}</div>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <div className={clsx(style.GratitudeItem)}>
                  <div>
                    <CardGiftcardIcon/>
                  </div>
                  <div>
                    <div className={clsx(style.Item)}>お礼品</div>
                    <div className={clsx(style.Price)}>~￥{req.gratitudeMaxPrice}</div>
                  </div>
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
