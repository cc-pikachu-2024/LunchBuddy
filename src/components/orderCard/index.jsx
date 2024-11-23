import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import style from "./style.module.scss";
import clsx from "clsx";

const OrderCard = ({menuList, gratitudeList, onClick, isMenuSelected, isGratitudeSelected}) => {


    return (<>
        <Grid container display="flex" justifyContent="space-between" alignItems="center">
            { menuList ? menuList.map ((menu) => {

                //選択された時に色を変える用
                
                const selected = isMenuSelected.includes(menu);
              
                return (
                  <Grid item size={6}  key={menu.item_id}>
                    {/* 選択されたら色を変える */}
                    <Card 
                        className={clsx(style.MenuCard, {
                            [style.SelectedCard]: selected
                        })}
                        onClick={() => onClick(menu)}
                    > 
                      { menu.item_name }<br></br>
                      { menu.item_image_name }
                  </Card>
                  </Grid>
                )
              }) :
              gratitudeList.map ((gratitude) => {

                //選択された時に色を変える用
                const selected = isGratitudeSelected.includes(gratitude);

                return (
                  <Grid item size={4}  key={gratitude.gratitude_id}>
                    <Card 
                        className={clsx(style.GratitudeCard, {
                            [style.SelectedCard]: selected
                        })}
                        onClick={() => onClick(gratitude)}
                    > 
                      { "~" + gratitude.max_price + "円"} 
                  </Card>
                  </Grid>
                )
              })
            }
        </Grid>
    </>)
}

export default OrderCard;