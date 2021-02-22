import React from "react";
import { Store } from "../../state/Store";
import { IMealProps, IMeal } from "../../state/interfaces";
import { setOrderCode, toggleFavAction } from "../../state/Actions";
import App from "../../App";
import VenmoBtn from "./VenmoBtn";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomCheckbox from "../Input/CustomCheckbox";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../Theme";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { setTotalCost } from "../../state/Actions";

var dateFormat = require("dateformat");

var QRCode = require('qrcode.react')

const EpisodeList = React.lazy<any>(() => import("./MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("./CartList"));

const useStyles = makeStyles({
  tip: {
    width: "12%",
    color: theme.palette.secondary.main,
    colorSecondary: theme.palette.primary.main,
    underline: theme.palette.primary.main,
  },
  tipInput: {
    fontFamily: 'Playfair',
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
  },

  cartHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    /* font-weight: 700, */
    fontFamily: 'Playfair',
    fontSize: '2.2rem',
    color: '#fff',
    lineHeight: '2.25rem',
    width: '100%',
    backgroundColor: '#c9512b',
    zIndex: 21,
    borderTopLeftRadius: '2rem',
    borderTopRightRadius: '2rem',
    boxShadow: '4px 4px 8px rgba(0,0,0,.15)',
    minHeight: '4.5rem',
  },

  cartContentContainer: {
    margin: 'auto',
    alignItems: 'center',
    maxWidth: '500px',
    justifyContent: 'space-evenly',
    maxHeight: '70vh',
    // backgroundColor: 'blue'
  },
  
  
  cartContent: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 0 1rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginBottom: '2vh',
    marginTop: '1vh',
  },
  cartCosts: {
    /* todo: add some @media stuff here to make responsive (width) */
    marginTop: '1.5rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    marginBottom: '2rem',
    flexShrink: 0,
    paddingRight: '1.5vw',
    paddingLeft: '1.5vw',
    width: '100%',
  },

  cartText: {
    fontSize: '16px',
    fontFamily: "Playfair",
    color: '#272727',
    letterSpacing: '.02em',
  },
  
  costRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  
  cartPaymentContainer: {
    marginBottom: '10rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  qrCode: {
    padding: '1rem',
  },
  
  cartButtonsBottom: {
      position: 'absolute',
      bottom: 0,
      height: '7.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fff',
  },
  
  cartButtons: {
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      justifyContent: 'space-between',
      width: '85%',
      maxWidth: '21.4rem',
      minHeight: '2.5rem',
      marginBottom: '2.125rem',
      userSelect: 'none',
  },
  
  cartButton: {
    fontFamily: "Playfair",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: '2.5rem',
    borderRadius: '2.5rem',
    fontSize: '1rem',
  },
  
  cartBackButton: {
      width: '29%',
      background: '#efefef',
  },
  
  cartReviewOrderButton: {
    width: '68%',
    background: '#c9512b',
    color: '#fff',
    textDecoration: 'none',
  },
});



export default function CartModal(modalProps: any) {
    var classes = useStyles();
    const { state, dispatch } = React.useContext(Store);
    const [checkedPaidBox, setPaidBox] = React.useState(false); //for tracking state of checkbox at bottom
    const [tipAmt, setTipAmt] = React.useState(0); //for tracking state of checkbox at bottom
    const [
      attemptedToConfirmOrder,
      setAttemptedToConfirmOrder,
    ] = React.useState(false); //for tracking state of checkbox at bottom

    const props = {
      meals: state.orders, //do this instead of state.episodes for just the orders
      store: { state, dispatch },
      toggleFavAction,
      orders: state.orders,
      //bascially looping over favorites, and if we click on unfavorite, then we get rid of it
    };

   const {
     getAccessTokenSilently,
     loginWithPopup,
     getAccessTokenWithPopup,
   } = useAuth0();
  
   //for isoTime, use "isoTime string with dateFormat"
  //  var reformattedLunchTime = dateFormat(state.date, "isoDate") + " 12:30:00";
  //  console.log(reformattedLunchTime);

   //start of OAuth-enabled function to submit order
   const submitOrder = async () => {
     try {
        var reformattedLunchTime = dateFormat(state.date, "isoDate") + " 12:30:00";
        // console.log(reformattedLunchTime);
       const token = await getAccessTokenSilently();
        axios
          .post(
            "http://localhost:3001/api/orderscreate",
            {
              deliveryTime: reformattedLunchTime, //  example: 2006-10-25 14:30:59"
              location: state.address,
              menuItems: state.orders.map((meal: IMeal) => meal.pk),
              pricePaid: state.totalCost,
              order_hash: state.orderCode
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
          });
     } catch (error) {
       console.log("Error in submitting post request for order, might not be signed in.");
     }
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
    if (totalCost != state.totalCost) {
      setTotalCost(dispatch, totalCost);
    }
    venmoLink = venmoLink.concat(totalCost.toString());
    venmoLink = venmoLink.concat(
      "&note=Thanks%20for%20your%20Good%20Neighbor%20zero%20fee%20pre-order%21%20%23"
    );

    //order code
    if (state.orderCode == "") {
      var newOrderCode = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (var i = 0; i < 5; i++)
        newOrderCode += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );
      // var newOrderCode : string = Math.random().toString(36).substring(7);
      setOrderCode(dispatch, newOrderCode);
    }
    venmoLink = venmoLink.concat(state.orderCode);

    return (
      <div className={`Modal ${modalProps.displayModal ? "Show" : "Hide"}`}>
        <div className="cart-header">Cart</div>
        <React.Suspense fallback={<div>loading...</div>}>
          <div className="cart-outer-width-container">
            <div className={classes.cartContentContainer}>
            {/* <div className="cart-content-container"> */}
              <div className="cart-content">
                <div className="cart-cards-layout">
                  <CartList {...props} />
                </div>
                <div className="cart-costs">
                  <div className="center">
                    <p className="cart-text">Tip:</p>
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
                    <p className="cart-text">Subtotal:</p>
                    <p className="cart-text">${mealsCost}</p>
                  </div>
                  <div className="cost-row">
                    <p className="cart-text">Tax:</p>
                    <p className="cart-text">${tax}</p>
                  </div>
                  <div className="cost-row">
                    <p className="cart-text">Optional Tip:</p>
                    <p className="cart-text">${tipAmt}</p>
                  </div>
                  <div className="cost-row">
                    <p className="cart-text bolded">Total:</p>
                    <p className="cart-text bolded">${totalCost}</p>
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
                  <p className="cart-text">
                    To pay via Venmo and confirm your order, first tap the Venmo
                    button below from your phone, or scan the QR code below if
                    you're using a desktop. Then, hit "confirm order."
                  </p>
                  <p className="cart-text">Address: {state.address}</p>
                  <p className="cart-text">Date/time: {dateFormat(state.date, "isoDate")}</p>
                  <p className="cart-text">Phone: </p>
                  <VenmoBtn paymentLink={venmoLink} />
                  <QRCode value={venmoLink} className={classes.qrCode} />
                  <p className="cart-text">
                    Orders without verified Venmo payments will not be fulfilled.
                  </p>

                  {/* potential bug here: setPaidBox isn't checking actual state of button, just toggling. might be possible to offset on-off cycle causing bug. */}
                  <div className="checkbox-row">
                    <CustomCheckbox
                      onChange={() => setPaidBox(!checkedPaidBox)}
                      label="Yes, I have paid with Venmo."
                    />
                  </div>
                </div>
              </div>
            </div>
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
              className={`cart-review-order-button${!checkedPaidBox ? ' cart-button-disabled' : ''}`}
              onClick={function () {
                setAttemptedToConfirmOrder(true);
                checkedPaidBox && submitOrder();
                setOrderCode(dispatch, "");//makes sure previous code doesn't persist for future orders
              }}
            >
              Confirm Order
            </div>
          </div>
          {attemptedToConfirmOrder && !checkedPaidBox ? (
            <p className="cart-text cart-error">
              Please pay with Venmo and select the checkbox above to order.
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
}
