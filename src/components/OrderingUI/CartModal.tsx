import { useAuth0 } from "@auth0/auth0-react";
import { setRef, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React from "react";
import {
  setOrderCode,
  clearOrderData,
  setTotalCost,
  toggleFavAction,
  toOrderHistory,
  setReferralCode,
  setReferralModal
} from "../../state/Actions";
import { IAddIn, IMenuItem, IOrderItem } from "../../state/interfaces";
import { Store } from "../../state/Store";
import CustomCheckbox from "../Input/CustomCheckbox";
import { theme } from "../Theme";
import CartPriceBreakdown from "./CartPriceBreakdown";
import VenmoBtn from "./VenmoBtn";
import { REACT_APP_BACKEND_API_URL } from "../../config";
import Loading from "../Loading";
import { ContactSupportOutlined } from "@material-ui/icons";

var dateFormat = require("dateformat");

var QRCode = require("qrcode.react");

// const EpisodeList = React.lazy<any>(() => import("./MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("./CartList"));

const useStyles = makeStyles({
  tip: {
    width: "15%",
    color: theme.palette.info.main,
    colorSecondary: theme.palette.primary.main,
    underline: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      width: "15%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "18%",
    },
  },
  tipInput: {
    fontFamily: "Playfair",
    color: theme.palette.info.main,
    colorSecondary: theme.palette.primary.main,
    fontSize: "1.25em",
    padding: "2%",
    width: "100%",
    min: "0",
    max: "2499",
    step: "1",
    textAlign: "center",
    underline: theme.palette.primary.main,
  },

  cartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    /* font-weight: 700, */
    fontFamily: "Playfair",
    fontSize: "2.2rem",
    color: "#fff",
    lineHeight: "2.25rem",
    width: "100%",
    backgroundColor: "#c9512b",
    zIndex: 21,
    borderTopLeftRadius: "2rem",
    borderTopRightRadius: "2rem",
    boxShadow: "4px 4px 8px rgba(0,0,0,.15)",
    minHeight: "4.5rem",
  },

  cartContentContainer: {
    margin: "auto",
    alignItems: "center",
    maxWidth: "500px",
    justifyContent: "space-evenly",
    height: "76vh",
    // backgroundColor: 'blue'
  },

  cartContent: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    padding: "0 0 1rem",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    marginBottom: "2vh",
    marginTop: "1vh",
  },
  cartCosts: {
    /* todo: add some @media stuff here to make responsive (width) */
    marginTop: "1.5rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: "1rem",
    marginBottom: "2rem",
    flexShrink: 0,
    paddingRight: "1.5vw",
    paddingLeft: "1.5vw",
    width: "100%",
  },

  cartText: {
    fontSize: "16px",
    fontFamily: "Playfair",
    color: "#272727",
    letterSpacing: ".02em",
  },

  costRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  cartPaymentContainer: {
    marginBottom: "10rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  qrCode: {
    padding: "1.2rem",
  },

  cartButtonsBottom: {
    position: "absolute",
    bottom: 0,
    height: "7.5rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  cartButtons: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "space-between",
    width: "85%",
    maxWidth: "21.4rem",
    minHeight: "2.5rem",
    marginBottom: "2.125rem",
    userSelect: "none",
  },

  cartButton: {
    fontFamily: "Playfair",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    height: "2.5rem",
    borderRadius: "2.5rem",
    fontSize: "1rem",
  },

  cartBackButton: {
    width: "29%",
    background: "#efefef",
  },

  cartReviewOrderButton: {
    width: "68%",
    background: "#c9512b",
    color: "#fff",
    textDecoration: "none",
  },
  cartContentBuffer: {
    width: "100%",
    height: "11rem",
    [theme.breakpoints.down("md")]: {
      height: "17rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "17rem",
    },
  },
});

export default function CartModal(modalProps: any) {
  var classes = useStyles();
  const { state, dispatch } = React.useContext(Store);
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [checkedPaidBox, setPaidBox] = React.useState(false); //for tracking state of checkbox at bottom
  const [orderInProgress, setOrderInProgress] = React.useState(false); //for tracking if order button is clicked
  const [tipAmt, setTipAmt] = React.useState(0); //for tracking tip
  const [attemptedToConfirmOrder, setAttemptedToConfirmOrder] = React.useState(
    false
  ); //for tracking state of checkbox at bottom
  const [validRefCode, setValidRefCode] = React.useState("");//if validRefCode != "", then it applies and user gets the discount. If validRefCode is "", then no valid ref code for discount.
  const [discount, setDiscount] = React.useState(0);//set to 1 if validRefCode != ""
  const [alreadyUsedReferral, setAlreadyUsedReferral] = React.useState(undefined);//hides referral code entry section if true
  const [refCodeMsg, setRefCodeMsg] = React.useState("");
  const deliveryFee = .99
  //Cost math and venmo string manipulation
  var venmoLink: string =
    "venmo://paycharge?txn=pay&recipients=GN-delivery&amount="; //partial, still need more parameters

  //calculates cost of menuItems
  const taxRate: number = 0.095;
  var menuItemsCost = state.orders.reduce(
    (accumulator: number, item: IOrderItem) =>
      accumulator + item.menuItem.price + item.add_ins.reduce((acc2: number, addIn: IAddIn) => acc2 + addIn.price, 0),
    0
  );
  var tax: number = Math.round(menuItemsCost * taxRate * 100) / 100; //rounding to two decimals
  //TODO: ADD TIP OPTION, MAKE RESPONSIVE, FIGURE OUT WHAT HAPPENS IF VENMO ISN'T INSTALLED, ADD CASHAPP (SHOULDN'T BE HARD)
  var totalCost: number = menuItemsCost + tipAmt + tax + deliveryFee - discount;
  totalCost = Math.round(totalCost * 100) / 100;

  if (totalCost != state.totalCost) {
    setTotalCost(dispatch, totalCost);
  }
  venmoLink = venmoLink.concat(totalCost.toString());
  venmoLink = venmoLink.concat(
    "&note=www.goodneighbor.delivery:%20Pre-ordered%20lunches%20delivered%20on%20Mondays%20for%2099%20cents%21%20%23"
  );

  //order code
  if (
    state.orderCode == "" ||
    (typeof state.orderCode == "undefined")//this is to mitigate a bug that Justin saw on his device
  ) {
    var newOrderCode = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789";
    for (var i = 0; i < 5; i++)
      newOrderCode += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    // var newOrderCode : string = Math.random().toString(36).substring(7);
    setOrderCode(dispatch, newOrderCode);
  }
  venmoLink = venmoLink.concat(state.orderCode);


  //referral code functions
  //get user's referral code from backend
  const getReferralCode = async () => {
    try {
      const token = await getAccessTokenSilently();

      await axios.get(
        `${REACT_APP_BACKEND_API_URL}/referralCode`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        setReferralCode(dispatch, response.data)
      })
      // console.log(response.data);
    } catch (error) {
      console.log("Error in getting referral code.");
    }
  }
  //gets and sets self referralcode in store
  if (state.referralCode == "" && isAuthenticated) {
    getReferralCode();
  } else if (!isAuthenticated) {//need to reset if switching between user accounts
    if (state.referralCode != "") {
      setReferralCode(dispatch, "");
    }
  }

    const validateReferralCode = async (refCode: string) => {
      try {
        const token = await getAccessTokenSilently();
        await axios
          .get(`${REACT_APP_BACKEND_API_URL}/validReferralCode/${refCode}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.valid) {
              setValidRefCode(refCode);
              setDiscount(1);
            } else {
              setValidRefCode("")
              setDiscount(0);
            }
            setRefCodeMsg(response.data.message)
            console.log(response);
          });
        // console.log(response.data);
      } catch (error) {
        console.log("Error in validating referral code.");
      }
    };

  //checks to see whether this user already used ref code.
  const checkIfAlreadyUsedReferral = async () => {
    try {
      const token = await getAccessTokenSilently();

      await axios
        .get(`${REACT_APP_BACKEND_API_URL}/referralCodeUsed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAlreadyUsedReferral(response.data);
          console.log()
        });
      // console.log(response.data);
    } catch (error) {
      console.log("Error in getting referral code.");
    }
  };

  if (alreadyUsedReferral == undefined) {
    checkIfAlreadyUsedReferral();
  }
  
  //for isoTime, use "isoTime string with dateFormat"
  //  var reformattedLunchTime = dateFormat(state.date, "isoDate") + " 12:30:00";
  //  console.log(reformattedLunchTime);

  //start of OAuth-enabled function to submit order
  const submitOrder = async () => {
    try {
      setOrderInProgress(true);
      var reformattedLunchTime =
        dateFormat(state.date, "isoDate") + " 12:30:00";
      // console.log(reformattedLunchTime);
      const token = await getAccessTokenSilently();
      const post_body = {
        deliveryTime: reformattedLunchTime, //  example: 2006-10-25 14:30:59"
        location: state.address,
        menuItems: state.orders.map((item: IOrderItem) => {
          return {
            menuItem: item.menuItem.pk,
            addIns: item.add_ins.map((value: IAddIn) => value.pk),
          };
        }),
        pricePaid: state.totalCost,
        order_hash: state.orderCode,
        tip: tipAmt,
        tax: tax,
        deliveryFee: deliveryFee,
        referralDiscount: discount,
        referral: validRefCode,
      };

      window.analytics.track('SUBMIT_ORDER_ATTEMPTED', {
        host: window.location.hostname,
        state: state,
        post_body: post_body
      });

      axios
        .post(
          `${REACT_APP_BACKEND_API_URL}/orderscreate`,
          post_body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setOrderInProgress(false);

          window.analytics.track('SUBMITTED_ORDER', {
            host: window.location.hostname,
            state: state,
            response: response
          });

          console.log(response);

          clearOrderData(dispatch);
          setReferralModal(dispatch, true);
          toOrderHistory(dispatch);
        });
    } catch (error) {
      setOrderInProgress(false);

      window.analytics.track('SUBMITTED_FAILED', {
        host: window.location.hostname,
        state: state,
        error: error
      });

      console.log(
        "Error in submitting post request for order, might not be signed in."
      );
    }
  };

  return (
    <div className={`Modal ${modalProps.displayModal ? "Show" : "Hide"}`}>
      <div className="cart-header">Cart</div>
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="cart-outer-width-container">
          <div className={classes.cartContentContainer}>
            {/* <div className="cart-content-container"> */}
            <div className="cart-content">
              <CartList />
              {isAuthenticated && (
                <div className="cart-costs">
                  <div className="center">
                    <p className={classes.cartText}>Tip:</p>
                    <TextField
                      onChange={(event) => {
                        window.analytics.track("CHANGE_TIP_FROM_CART", {
                          host: window.location.hostname,
                          state: state,
                          cart: state.orders,
                          tip: event.target.value,
                        });
                        setTipAmt(Number(event.target.value));
                      }}
                      className={classes.tip}
                      type="number"
                      inputProps={{
                        className: classes.tipInput,
                      }}
                    />
                  </div>
                  <CartPriceBreakdown
                    menuItemsCost={menuItemsCost}
                    tax={tax}
                    deliveryFee={deliveryFee}
                    tipAmt={tipAmt}
                    totalCost={totalCost}
                    discount={discount}
                  />
                  {alreadyUsedReferral ? (
                    <p></p>
                  ) : (
                    <div>
                      <div className="center">
                        <p className={classes.cartText}>
                          1st Time Referral Code (Optional):
                        </p>
                        <TextField
                          onChange={(event) => {
                            // window.analytics.track('UPDATE_REFERRAL_CODE', {
                            //   host: window.location.hostname,
                            //   state: state,
                            //   event: event
                            // });
                            var currReferralCode: string = String(
                              event.target.value
                            );
                            if (currReferralCode.length == 6) {
                              //hardcoded value, which is kind of bad
                              validateReferralCode(currReferralCode);
                              if (validRefCode != "") {
                                setDiscount(1);
                              }
                            } else if (currReferralCode.length == 0) {
                              setDiscount(0)
                              setRefCodeMsg("");
                            } else {
                                setDiscount(0);
                                setRefCodeMsg("Codes are 6 characters long");
                              // setTimeout(() => {setRefCodeMsg("Codes are 6 characters long")}, 2000)//2.5 second delay
                            }
                            // setTipAmt(Number(event.target.value));
                          }}
                          className={classes.tip}
                          type="text"
                          inputProps={{
                            className: classes.tipInput,
                          }}
                        />
                      </div>
                      <p className="cart-text cart-error">
                        {refCodeMsg}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {isAuthenticated && (
                <div className="cart-payment-container">
                  <p className={classes.cartText}>
                    To pay via Venmo and place your order, first tap the Venmo
                    button below from your phone, or scan the QR code from your
                    camera app (not the Venmo app). Then, hit "Place Order."
                  </p>
                  <p className={classes.cartText}>Address: {state.address}</p>
                  <p className={classes.cartText}>
                    Date/Time: {dateFormat(state.date, "isoDate")}
                  </p>
                  <p className={classes.cartText}>
                    Dinner (6pm-8pm) for Bunz and Seniore's
                  </p>
                  <p className={classes.cartText}>
                    Lunch (12pm-2pm) for all other options
                  </p>
                  <VenmoBtn paymentLink={venmoLink} />
                  <QRCode value={venmoLink} className={classes.qrCode} />
                  <p className={classes.cartText}>
                    Orders without verified Venmo payments will not be
                    fulfilled.
                  </p>
                  {/* potential bug here: setPaidBox isn't checking actual state of button, just toggling. might be possible to offset on-off cycle causing bug. */}
                  <div className="checkbox-row">
                    <CustomCheckbox
                      onChange={() => {
                        window.analytics.track("PAID_BOX_CHANGED_FROM_CART", {
                          host: window.location.hostname,
                          state: state,
                          cart: state.orders,
                          paid: !checkedPaidBox,
                        });
                        setPaidBox(!checkedPaidBox);
                      }}
                      label="Yes, I have paid with Venmo!"
                    />
                  </div>
                </div>
              )}
              <div className={classes.cartContentBuffer}></div>
            </div>
          </div>
        </div>
      </React.Suspense>
      <div className="cart-buttons-bottom">
        <div className="cart-buttons">
          <div className="cart-back-button" onClick={modalProps.closeFunction}>
            Back
          </div>
          <div
            className={`cart-review-order-button${
              isAuthenticated && (!checkedPaidBox || state.orders.length <= 0)
                ? " cart-button-disabled"
                : ""
            }`}
            onClick={function () {
              setAttemptedToConfirmOrder(true);
              if (!isAuthenticated) {
                window.analytics.track("CART_LOG_IN", {
                  host: window.location.hostname,
                  state: state,
                  cart: state.orders,
                });
                loginWithRedirect();
              } else if (checkedPaidBox && state.menuItems.length > 0) {
                if (!orderInProgress) {
                  submitOrder();
                }
              }
            }}
          >
            {isAuthenticated ? (
              !orderInProgress ? (
                "Place Order"
              ) : (
                <Loading primary={false} />
              )
            ) : (
              "Sign In To Order"
            )}
          </div>
        </div>
        {isAuthenticated &&
        attemptedToConfirmOrder &&
        (!checkedPaidBox || state.orders.length <= 0) ? (
          !checkedPaidBox ? (
            <p className="cart-text cart-error">
              Please pay with Venmo and select the checkbox above to order.
            </p>
          ) : (
            <p className="cart-text cart-error">
              You must select at least one item before checking out.
            </p>
          )
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
