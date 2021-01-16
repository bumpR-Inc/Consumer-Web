import React from "react";
import { Store } from "../state/Store";
import { IMealProps, IMeal } from "../state/interfaces";
import { toggleFavAction } from "../state/Actions";
import App from "../App";
import VenmoBtn from "../components/VenmoBtn";


const EpisodeList = React.lazy<any>(() => import("../components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("../components/CartList"));


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

  var mealsCost = props.orders.reduce((accumulator : number, currentMeal : IMeal) => accumulator + (currentMeal.price), 0);
  venmoLink = venmoLink.concat(mealsCost.toString());
  venmoLink = venmoLink.concat("&note=Thanks%20for%20your%20Good%20Neighbor%20zero%20fee%20pre-order%21");
  //TODO: ADD TIP OPTION, MAKE RESPONSIVE, FIGURE OUT WHAT HAPPENS IF VENMO ISN'T INSTALLED, ADD CASHAPP (SHOULDN'T BE HARD)

  return (
    <App path="/">
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="cart-cards-layout">
          <CartList {...props} />
        </div>
        {console.log({venmoLink})}
        <p>To confirm your order, please pay ${mealsCost} with Venmo below.</p>
        <VenmoBtn paymentLink={venmoLink}/>
        
      </React.Suspense>
    </App>
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
