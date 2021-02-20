import React from "react";
import { Store } from "../../state/Store";
import { IMeal } from "../../state/interfaces";
import { toggleFavAction } from "../../state/Actions";
import VenmoBtn from "../../components/OrderingUI/VenmoBtn";
import Wrapper from "./Wrapper";


const EpisodeList = React.lazy<any>(() => import("../../components/OrderingUI/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("../../components/OrderingUI/CartList"));

export default function OrdersPage(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  //example full venmoLink: venmo://paycharge?txn=pay&recipients=GN-delivery&amount=10&note=Thanks%20for%20your%20Good%20Neighbor%20zero%20fee%20pre-order%21
  var venmoLink: string = "venmo://paycharge?txn=pay&recipients=GN-delivery&amount=";//partial, still need more parameters

  const props = {
    meals: state.orders, //do this instead of state.episodes for just the orders
    store: { state, dispatch },
    toggleFavAction,
    orders: state.orders,
    //bascially looping over favorites, and if we click on unfavorite, then we get rid of it
  };

  //calculates cost of meals
  const taxRate : number = .0725
  var mealsCost = props.orders.reduce((accumulator : number, currentMeal : IMeal) => accumulator + (currentMeal.price), 0);
  var tax : number = Math.round(mealsCost * taxRate * 100) / 100 //rounding to two decimals
  var tip : number = 0
  //TODO: ADD TIP OPTION, MAKE RESPONSIVE, FIGURE OUT WHAT HAPPENS IF VENMO ISN'T INSTALLED, ADD CASHAPP (SHOULDN'T BE HARD)
  var totalCost : number = mealsCost + tip + tax
  venmoLink = venmoLink.concat(totalCost.toString());
  venmoLink = venmoLink.concat(
    "&note=Thanks%20for%20your%20Good%20Neighbor%20zero%20fee%20pre-order%21"
  );

  return (
    <Wrapper path="/">
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="cart-cards-layout">
          <CartList {...props} />
        </div>
        {console.log({ venmoLink })}
        <p>Subtotal: ${mealsCost}</p>
        <p>Tax: ${tax}</p>
        <p>Optional Tip: ${tip}</p>
        <p>To confirm your order, please pay ${totalCost} with Venmo below.</p>
        <VenmoBtn paymentLink={venmoLink} />
      </React.Suspense>
    </Wrapper>
  );
}

// import React from "react";
// import { Store } from "./Store";
// import { IEpisodeProps } from "./interfaces";
// import { toggleFavAction } from "./Actions";

// const EpisodeList = React.lazy<any>(() => import("./EpisodesList")); //react lazy isntead of normal importing. see suspense and fallback below

// export default function OrdersPage(): JSX.Element {
//   const { state, dispatch } = React.useContext(Store);

//   const props = {
//     episodes: state.orders, //do this instead of state.episodes for just the orders
//     store: { state, dispatch },
//     toggleFavAction,
//     orders: state.orders,
//     //bascially looping over favorites, and if we click on unfavorite, then we get rid of it
//   };

//   return (
//     <React.Suspense fallback={<div>loading...</div>}>
//       <div className="episode-layout">
//         <EpisodeList {...props} />
//       </div>
//     </React.Suspense>
//   );
// }