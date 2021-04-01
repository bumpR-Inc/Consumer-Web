import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../index.css";
import { Store } from "../../state/Store";
import { IAddIn, IOrderItem } from "../../state/interfaces";

const useStyles = makeStyles({
  card: {
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '2%'
  },
  image: {
    height: '100px',
    width: '125px',
    objectFit: 'cover'
  },
  detailContainer: {
    flex: 1,
    padding: '1%'
  },
  butonContainer: {
    flex: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
    justifyContent: 'center',
    fontSize: '2.5em',
    padding: '2%',
    textAlign: 'center'
  },
  root: {
    width: 500,
    height: 295,
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

  let add_ins: string = "";
  if (item.add_ins.length > 0) {
    add_ins = item.add_ins.map((value: IAddIn) => "+" + value.name + " ($" + value.price + ")").join(", ");
  }

  return (
    <div className={classes.card}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={item.menuItem.picture_url} alt="food item"></img>
      </div>
      <div className={classes.detailContainer}>
        <div className="cart-card-title">{item.menuItem.foodName}</div>
        <div className="cart-card-price">
          ${item.menuItem.price} | {item.menuItem.restaurant.name}
        </div>
        {item.add_ins.length > 0 && (
          <div className="cart-card-price">{add_ins}</div>
        )}
      </div>
      {!hideButtons && (
        <div className={classes.butonContainer}>
          <div
            onClick={() => {
              window.analytics.track("ADD_QUANTITY_FROM_CART", {
                host: window.location.hostname,
                state: state,
                cart: state.orders,
                menuItem: item.menuItem,
              });
              addOnClick();
            }}
            >
            +
          </div>
          <div>
            {numInCart}
          </div>
          <div
            onClick={() => {
              window.analytics.track("SUB_QUANTITY_FROM_CART", {
                host: window.location.hostname,
                state: state,
                cart: state.orders,
                menuItem: item.menuItem,
              });
              subtractOnClick();
            }}
          >
            -
          </div>
        </div>
      )}
    </div>
  );
}
