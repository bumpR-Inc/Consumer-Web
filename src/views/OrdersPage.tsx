import React from "react";
import { Store } from "../state/Store";
import { IMealProps } from "../state/interfaces";
import { toggleFavAction } from "../state/Actions";
import App from "../App";

const EpisodeList = React.lazy<any>(() => import("../components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const CartList = React.lazy<any>(() => import("../components/CartList"));

export default function OrdersPage(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  const props = {
    meals: state.orders, //do this instead of state.episodes for just the orders
    store: { state, dispatch },
    toggleFavAction,
    orders: state.orders,
    //bascially looping over favorites, and if we click on unfavorite, then we get rid of it
  };

  return (
    <App path="/">
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="cart-cards-layout">
          <CartList {...props} />
        </div>
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
