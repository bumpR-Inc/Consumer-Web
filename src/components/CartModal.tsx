import React from "react";
import { Store } from "../state/Store";
import { IMealProps, IMeal } from "../state/interfaces";
import { toggleFavAction } from "../state/Actions";
import App from "../App";
import VenmoBtn from "../components/VenmoBtn";

const EpisodeList = React.lazy<any>(() => import("../components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("../components/CartList"));

export default function CartModal(modalProps: any) {
    const { state, dispatch } = React.useContext(Store);

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
    const taxRate: number = 0.0725;
    var mealsCost = props.orders.reduce(
        (accumulator: number, currentMeal: IMeal) =>
        accumulator + currentMeal.price,
        0
    );
    var tax: number = Math.round(mealsCost * taxRate * 100) / 100; //rounding to two decimals
    var tip: number = 0;
    //TODO: ADD TIP OPTION, MAKE RESPONSIVE, FIGURE OUT WHAT HAPPENS IF VENMO ISN'T INSTALLED, ADD CASHAPP (SHOULDN'T BE HARD)
    var totalCost: number = mealsCost + tip + tax;
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
                <div className="cost-row">
                  <p className="cost-breakdown">Subtotal:</p>
                  <p>${mealsCost}</p>
                </div>
                <div className="cost-row">
                  <p>Tax:</p>
                  <p>${tax}</p>
                </div>
                <div className="cost-row">
                  <p>Optional Tip:</p>
                  <p>${tip}</p>
                </div>
                <div className="cost-row">
                  <p>Total:</p>
                  <p>${totalCost}</p>
                </div>
                <p>
                  To confirm your order, please pay ${totalCost} with Venmo
                  below.
                </p>
                <p>
                  If you were ordering the same thing on DoorDash, you'd be
                  paying ${totalCost * 2}!
                </p>
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
            <div className="cart-review-order-button">Review Order</div>
            {/* <VenmoBtn paymentLink={venmoLink} /> */}
          </div>
        </div>
      </div>
    );
}
