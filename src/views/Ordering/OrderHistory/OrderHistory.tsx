import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

import React from "react";
import { theme } from "../../../components/Theme";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import CartCard from "../../../components/OrderingUI/CartCard";
import CartPriceBreakdown from "../../../components/OrderingUI/CartPriceBreakdown";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { fromOrderHistory } from "../../../state/Actions";
import { Store } from "../../../state/Store";
import { REACT_APP_BACKEND_API_URL } from '../../../config';
import Loading from "../../../components/Loading";

const dateFormat = require("dateformat");

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
  },
  navContainer: {
    height: "5vh",
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: "1%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 3,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  },
  navText: {
    fontFamily: "Playfair Display",
    color: theme.palette.primary.main,
    fontSize: "2.5em",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "95vh",
    // backgroundColor: theme.palette.secondary.main,
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
  },
  orderListContainer: {
    width: "35%",
    height: "100%",
    backgroundColor: theme.palette.secondary.main,

    display: "flex",
    flexDirection: "column",
    // justifyContent: 'center',
    padding: "1%",
    alignItems: "center",
    // gap: '2%',
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
    overflow: "scroll",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  orderListTitleContainer: {
    width: "95%",
    height: "75px",
  },
  orderListTitle: {
    fontSize: "4em",
    // textAlign: 'center',
    fontFamily: "Playfair Display",
    color: theme.palette.primary.main,
  },
  orderListItem: {
    width: "95%",
    // height: '125px',
    margin: "1%",
    flexShrink: 0,
    backgroundColor: "white",
    zIndex: 2,
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",

    display: "flex",
    flexDirection: "column",
    padding: "3%",
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
  },
  orderListItemTitle: {
    fontFamily: "Playfair Display",
    color: theme.palette.primary.main,
    fontSize: "3em",
    margin: "0px",
  },
  orderListItemSubtitle: {
    fontFamily: "Playfair Display",
    color: theme.palette.primary.main,
    fontWeight: "normal",
  },
  selected: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
  },
  orderContainer: {
    width: "65%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 1,
    boxShadow: "-4px 0px 20px rgba(0, 0, 0, 0.15)",

    // display: 'flex',
    // flexDirection: 'column',
    // flexShrink: 0,
    padding: "3%",
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
    gap: "2%",
    overflow: "scroll",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  orderDataContainer: {
    display: "flex",
    flexDirection: "row",
    // padding: '3%',
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
    gap: "2%",
  },
  orderData: {
    fontFamily: "Playfair Display",
    color: theme.palette.primary.main,
    fontWeight: "normal",
    fontSize: "5em",
    margin: "0px",

    [theme.breakpoints.down("md")]: {
      fontSize: "3.3em",
    },
  },
  orderIcon: {
    color: theme.palette.primary.main,
    fontSize: "5em",
  },
  colBuffer: {
    height: "5%",
    width: "100%",
  },
  noOrders: {
    color: theme.palette.primary.main
  }
});

export default function Footer() {
  var classes = useStyles();
  const { state, dispatch } = React.useContext(Store); //can remove "dispatch"

  useEffect(() => {
    window.analytics.track('ORDER_HISTORY_PAGE_OPENNED', {
      host: window.location.hostname,
      state: state,
    });
  }, [state]);

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersRecieved, setOrdersRecieved] = useState<boolean>(false);
  const [orderSelected, selectOrder] = useState<number>(
    window.innerWidth > theme.breakpoints.values.md ? 0 : -1
  );
  const {
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const onOrderClick = (index: number) => {
    selectOrder(index);
  };

  const clearOrder = () => {
    selectOrder(-1);
  };

  React.useEffect(() => {
    if (isAuthenticated && !ordersRecieved) {
      (async () => {
        console.log("hi");
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          `${REACT_APP_BACKEND_API_URL}/userOrders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        // console.log(response.data[0].items_info)

        var orders = response.data;
        if (orders === 'No orders found for this user') {
          setOrders([]);
        } else {
          for (var i = 0; i < orders.length; i++) {
            let items_text = "";
            for (var j = 0; j < orders[i].order_items.length; j++) {
              if (items_text.length < 50) {
                items_text += orders[i].order_items[j].menuItem.foodName;
                if (j < orders[i].order_items.length - 1) {
                  items_text += ", ";
                }
              } else {
                items_text += "...";
                break;
              }
            }
            orders[i].items_text = items_text;
          }

          setOrders(orders);
          setOrdersRecieved(true);
        }
      })();
    } else {
      if (!isAuthenticated) {
        fromOrderHistory(dispatch);
      }
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.navContainer}>
        {orderSelected === -1 ||
        window.innerWidth > theme.breakpoints.values.md ? (
            <a
            href="/"
            className={classes.navText}
            onClick={() => {
              window.analytics.track("TO_MENU_FROM_ORDER_HISTORY", {
                host: window.location.hostname,
                state: state,
              });
              fromOrderHistory(dispatch);
            }}
          >
            {"< Return to Ordering Page"}
          </a>
        ) : (
          <a href="/" className={classes.navText} onClick={clearOrder}>
            {"< Back"}
          </a>
        )}
      </div>
      <div className={classes.bodyContainer}>
        {ordersRecieved && orders.length > 0 ? (
          <>
            {(orderSelected === -1 ||
              window.innerWidth > theme.breakpoints.values.md) && (
              <div className={classes.orderListContainer}>
                <div className={classes.orderListTitleContainer}>
                  <h1 className={classes.orderListTitle}>Order History</h1>
                </div>
                {orders?.map((value: any, index: number) => {
                  return (
                    <div
                      className={
                        classes.orderListItem +
                        (index === orderSelected ? " " + classes.selected : "")
                      }
                      onClick={() => {
                        window.analytics.track("ORDER_HISTORY_ORDER_CLICKED", {
                          host: window.location.hostname,
                          state: state,
                          order_index: index,
                          orders: orders,
                        });
                        onOrderClick(index);
                      }}
                    >
                      <h1
                        className={
                          classes.orderListItemTitle +
                          (index === orderSelected ? " " + classes.selected : "")
                        }
                      >
                        {dateFormat(orders[index].deliveryTime, "ddd, mmmm d")}
                      </h1>
                      <h1
                        className={
                          classes.orderListItemSubtitle +
                          (index === orderSelected ? " " + classes.selected : "")
                        }
                      >
                        {orders[index].items_text}
                      </h1>
                    </div>
                  );
                })}
              </div>
            )}
            {(orderSelected !== -1 ||
              window.innerWidth > theme.breakpoints.values.md) && (
              <div className={classes.orderContainer}>
                <div className={classes.orderDataContainer}>
                  <ScheduleIcon className={classes.orderIcon} />
                  <h1 className={classes.orderData}>
                    {dateFormat(
                      orders[orderSelected].deliveryTime,
                      "ddd, mmmm d"
                    )}
                  </h1>
                </div>
                <div className={classes.orderDataContainer}>
                  <RoomIcon className={classes.orderIcon} />
                  <h1 className={classes.orderData}>
                    {orders[orderSelected].location}
                  </h1>
                </div>
                {orders[orderSelected]?.order_items?.map(
                  (value: any, index: number) => {
                    return (
                      <CartCard
                        item={value}
                        numInCart={2}
                        addOnClick={() => {}}
                        subtractOnClick={() => {}}
                        hideButtons={true}
                      />
                    );
                  }
                )}
                <div className={classes.colBuffer} />
                <CartPriceBreakdown
                  menuItemsCost={
                    //potential bug, jank since we don't pass in subtotal to the backend.
                    orders[orderSelected].pricePaid -
                    (orders[orderSelected].tax +
                      orders[orderSelected].tip +
                      orders[orderSelected].deliveryFee) +
                      orders[orderSelected].referralDiscount
                  }
                  tax={orders[orderSelected].tax}
                  tipAmt={orders[orderSelected].tip}
                  deliveryFee={orders[orderSelected].deliveryFee}
                  totalCost={orders[orderSelected].pricePaid}
                  discount={orders[orderSelected].referralDiscount}
                />
              </div>
            )}
          </>
        ) : !ordersRecieved ? (
          <Loading primary={true} />
        ) : (
          <h1 className={classes.noOrders}>No Orders Placed Yet</h1>
        )}
      </div>
    </div>
  );
}