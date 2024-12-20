import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import style from "./style.module.scss";
import clsx from "clsx";
import { Divider } from '@mui/material';

const OrderCard = ({menuList, gratitudeList, onClick, isMenuSelected, isGratitudeSelected}) => {


    return (<>
        <Grid container display="flex" justifyContent="space-between" alignItems="center">
            { menuList ? menuList.map ((menu) => {

                //選択された時に色を変える用
                
                const selected = isMenuSelected.includes(menu);
              
                return (
                  <Grid item size={6}  key={menu.itemId}>
                    {/* 選択されたら色を変える */}
                    <Card 
                        className={clsx(style.MenuCard, {
                            [style.SelectedCard]: selected
                        })}
                        onClick={() => onClick(menu)}
                      > 
                        <div className={clsx(style.cardContent)}>
                          <div>{menu.itemName}</div> 
                          <img className={clsx(style.image)} src={menu.itemImageName} alt={menu.itemName} />
                        </div>
                    </Card>
                    <Divider className={clsx(style.Divider)}></Divider>
                  </Grid>
                )
              }) :
              gratitudeList.map ((gratitude) => {

                //選択された時に色を変える用
                const selected = isGratitudeSelected.includes(gratitude);

                return (
                  <Grid item size={4}  key={gratitude.gratitudeId}>
                    <Card 
                        className={clsx(style.GratitudeCard, {
                            [style.SelectedCard]: selected
                        })}
                        onClick={() => onClick(gratitude)}
                    > 
                      { "~" + gratitude.maxPrice + "円"} 
                  </Card>
                  </Grid>
                )
              })
            }
        </Grid>
    </>)
}

export default OrderCard;