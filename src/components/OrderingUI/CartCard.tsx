import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../../index.css";
import addImg from "../assets/img/add.png";
import { Store } from "../../state/Store";
import { IAddIn, IOrderItem } from "../../state/interfaces";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 300,
  },
  media: {
    height: 210,
  },
  cardContent: {
    height: 55,
  },
});

interface ICartCard {
  item: IOrderItem,
  hideButtons?: boolean,
  numInCart: number,
  subtractOnClick: () => void,
  addOnClick: () => void,
}

export default function CartCard({item, hideButtons, numInCart, subtractOnClick, addOnClick}: ICartCard) {
  const classes = useStyles();
  const { state } = React.useContext(Store);

  console.log('card');
  // console.log(props);

  let add_ins: string = "";
  if (item.add_ins.length > 0) {
    add_ins = item.add_ins.map((value: IAddIn) => "+" + value.name + " ($" + value.price + ")").join(", ");
  }

  console.log(item);

  return (
    <div className="cart-card-container">
      <div className="cart-card-second-container">
        <img className="cart-card-img" src={item.menuItem.picture_url}></img>
        <div className="cart-card-content">
          <div className="cart-card-title">{item.menuItem.foodName}</div>
          <div className="cart-card-price">
            ${item.menuItem.price} | {item.menuItem.restaurant.name}
          </div>
          {
            item.add_ins.length > 0 && 
            <div className="cart-card-price">
              {add_ins}
            </div>
          }
          {
            !hideButtons &&
            (<div className="cart-card-buttons-container">
              <div className="cart-card-buttons">
                <div onClick={() => {
                  window.analytics.track('SUB_QUANTITY_FROM_CART', {
                    host: window.location.hostname,
                    state: state,
                    cart: state.orders,
                    menuItem: item.menuItem
                  });
                  subtractOnClick();
                }}>-</div>
                {numInCart}
                <div onClick={() => {
                  window.analytics.track('ADD_QUANTITY_FROM_CART', {
                    host: window.location.hostname,
                    state: state,
                    cart: state.orders,
                    menuItem: item.menuItem
                  });
                  addOnClick();
                }}>+</div>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  );
}
