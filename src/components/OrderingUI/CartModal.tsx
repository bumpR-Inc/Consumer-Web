import React from "react";
import { Store } from "../../state/Store";
import { IMealProps, IMeal } from "../../state/interfaces";
import { toggleFavAction } from "../../state/Actions";
import App from "../../App";
import VenmoBtn from "./VenmoBtn";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomCheckbox from "../Input/CustomCheckbox";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../Theme";



var QRCode = require('qrcode.react')

const EpisodeList = React.lazy<any>(() => import("./MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("./CartList"));

const useStyles = makeStyles({
  tip: {
    width: "12%",
    color: theme.palette.secondary.main,
    colorSecondary: theme.palette.primary.main,
    underline: theme.palette.primary.main,

    // backgroundColor: "red"
  },
  tipInput: {
    fontFamily: "Playfair Display",
    color: theme.palette.secondary.main,
    colorSecondary: theme.palette.primary.main,
    fontSize: "1.3em",
    padding: "2%",
    width: "100%",
    min: "0",
    max: "2499",
    step: "1",
    textAlign: "center",
    underline: theme.palette.primary.main,
    // MozBoxSizing: "border-box",
    // WebkitBoxSizing: "border-box",
    // boxSizing: "border-box",

    // [theme.breakpoints.down("sm")]: {
    //   fontSize: "2.5em",
    // },
  },
});



export default function CartModal(modalProps: any) {
  

    var classes = useStyles();
    const { state, dispatch } = React.useContext(Store);
    const [checkedPaidBox, setPaidBox] = React.useState(false);//for tracking state of checkbox at bottom
    const [tipAmt, setTipAmt] = React.useState(0);//for tracking state of checkbox at bottom
    const [attemptedToConfirmOrder, setAttemptedToConfirmOrder] = React.useState(false);//for tracking state of checkbox at bottom

    const props = {
      meals: state.orders, //do this instead of state.episodes for just the orders
      store: { state, dispatch },
      toggleFavAction,
      orders: state.orders,
      //bascially looping over favorites, and if we click on unfavorite, then we get rid of it
    };

  //Cost math and venmo string manipulation
    var venmoLink: string =
        "venmo://paycharge?txn=pay&recipients=GN-delivery&amount="; //partial, still need more parameters

    //calculates cost of meals
    const taxRate: number = 0.0925;
    var mealsCost = props.orders.reduce(
        (accumulator: number, currentMeal: IMeal) =>
        accumulator + currentMeal.price,
        0
    );
    var tax: number = Math.round(mealsCost * taxRate * 100) / 100; //rounding to two decimals
    //TODO: ADD TIP OPTION, MAKE RESPONSIVE, FIGURE OUT WHAT HAPPENS IF VENMO ISN'T INSTALLED, ADD CASHAPP (SHOULDN'T BE HARD)
    var totalCost: number = mealsCost + tipAmt + tax;
    venmoLink = venmoLink.concat(totalCost.toString());
    venmoLink = venmoLink.concat(
        "&note=Thanks%20for%20your%20Good%20Neighbor%20zero%20fee%20pre-order%21"
    );

    return (
      <div className={`Modal ${modalProps.displayModal ? "Show" : "Hide"}`}>
        <div className="cart-header">Cart</div>
        <React.Suspense fallback={<div>loading...</div>}>
          <div className="cart-content-container">
            <div className="cart-content">
              <div className="cart-cards-layout">
                <CartList {...props} />
              </div>
              {/* {console.log({ venmoLink })} */}
              <div className="cart-costs">
                <div className="center">
                  <p className="cartText">Tip:</p>
                  <TextField
                    onChange={(event) => setTipAmt(Number(event.target.value))}
                    className={classes.tip}
                    type="number"
                    inputProps={{
                      min: "0",
                      max: "2499",
                      step: "1",
                      className: classes.tipInput,
                    }}
                  />
                </div>
                <div className="cart-line"></div>
                <div className="cost-row">
                  <p className="cartText">Subtotal:</p>
                  <p className="cartText">${mealsCost}</p>
                </div>
                <div className="cost-row">
                  <p className="cartText">Tax:</p>
                  <p className="cartText">${tax}</p>
                </div>
                <div className="cost-row">
                  <p className="cartText">Optional Tip:</p>
                  <p className="cartText">${tipAmt}</p>
                </div>
                <div className="cost-row">
                  <p className="cartText bolded">Total:</p>
                  <p className="cartText bolded">${totalCost}</p>
                </div>
                <div className="cart-line"></div>

                {/* <div className="cost-row">
                  <p className="cardText">
                    To confirm your order, please pay ${totalCost} with Venmo
                    below.
                  </p>
                </div> */}
                {/* <p>
                  If you were ordering the same thing on DoorDash, you'd be
                  paying ${totalCost * 2}!
                </p> */}
              </div>
              <div className="cart-payment-container">
                <p className="cartText">
                  To pay via Venmo and confirm your order, first tap the Venmo
                  button below from your phone, or scan the QR code below if
                  you're using a desktop. Then, hit "confirm order."
                </p>
                <VenmoBtn paymentLink={venmoLink} />
                <QRCode value={venmoLink} className="qr-code" />
                <p className="cartText">
                  Orders without verified Venmo payments will not be fulfilled.
                </p>
                {/* <p>
                  Similarly, if there is a complication with your order, you
                  will receive a Venmo refund from @GN-delivery.
                </p> */}

                {/* potential bug here: setPaidBox isn't checking actual state of button, just toggling. might be possible to offset on-off cycle causing bug. */}

                <div className="checkbox-row">
                  <CustomCheckbox
                    onChange={() => setPaidBox(!checkedPaidBox)}
                    label="Yes, I have paid with Venmo."
                  />
                  {/* <p className="cartText">Bow</p> */}
                </div>
                {/* {checkedPaidBox ? <p>checked</p> : <p>not</p>} */}
                <p>
                  TODO: add checkbox saying yes i have paid with venmo before
                  confirming, address + tip entry, date entry, phone number
                  verification, styling
                </p>
              </div>
            </div>
            {/* <div className="cart-payment-container">
              <VenmoBtn paymentLink={venmoLink} />
            </div> */}
          </div>
        </React.Suspense>
        <div className="cart-buttons-bottom">
          <div className="cart-buttons">
            <div
              className="cart-back-button"
              onClick={modalProps.closeFunction}
            >
              Back
            </div>
            <div
              className="cart-review-order-button"
              onClick={() => setAttemptedToConfirmOrder(true)}
            >
              Confirm Order
            </div>
          </div>
          {(attemptedToConfirmOrder && !checkedPaidBox) ? <p className="cartText">Please pay with Venmo and select the checkbox above to order.</p> : <p></p>}
        </div>
      </div>
    );
}
