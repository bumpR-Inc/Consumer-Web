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

export default function CartCard(props: any) {
  const classes = useStyles();
  const { state } = React.useContext(Store);

  console.log('card');
  console.log(props);

  return (
    <div className="cart-card-container">
      <div className="cart-card-second-container">
        <img className="cart-card-img" src={props.meal.picture_url}></img>
        <div className="cart-card-content">
          <div className="cart-card-title">{props.meal.foodName}</div>
          <div className="cart-card-price">
            ${props.meal.price} | {props.meal.restaurant_info.name}
          </div>
          {
            !props.hideButtons &&
            (<div className="cart-card-buttons-container">
              <div className="cart-card-buttons">
                <div onClick={() => {
                  window.analytics.track('SUB_QUANTITY_FROM_CART', {
                    host: window.location.hostname,
                    state: state,
                    cart: state.orders,
                    meal: props.meal
                  });
                  props.subtractOnClick();
                }}>-</div>
                {props.numInCart}
                <div onClick={() => {
                  window.analytics.track('ADD_QUANTITY_FROM_CART', {
                    host: window.location.hostname,
                    state: state,
                    cart: state.orders,
                    meal: props.meal
                  });
                  props.addOnClick();
                }}>+</div>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  );
}
