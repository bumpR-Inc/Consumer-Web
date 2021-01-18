import React from "react";
import { Store } from "../state/Store";
import CartModal from "../components/CartModal"

import { IMealProps } from "../state/interfaces";
import { fetchDataAction, toggleFavAction } from "../state/Actions";
import App from "../App";

const MealList = React.lazy<any>(() => import("../components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);
  const [displayModal, setDisplayModal] = React.useState(false);


  React.useEffect(() => {
    (state.meals?.length === 0 ?? false) && fetchDataAction(dispatch); //if state episodes array is empty, run this function
  }); //useEffect hook is to get data as soon as user lands on the page

  const props: IMealProps = {
    meals: state.meals,
    store: { state, dispatch },
    toggleFavAction: toggleFavAction,
    orders: state.orders,
  };

  return (
    <App path="/">
      <div className="menu-full-flex-container">
        <div className="menu-constrained-container">
          <React.Fragment>
            <React.Suspense fallback={<div>loading...</div>}>
              <div>
                <div className="restaurant-name">Punjabi Dhaba</div>
                  <div className="restaurant-line"></div>
                <div>
                  <section className="meal-layout">
                    <MealList {...props} />
                  </section>
                </div>
              </div>
            </React.Suspense>
            <div className="bottom-cart-btn-wrapper">
              <div className="cart-button-wrapper">
                <div
                  className="cart-button"
                  onClick={() => setDisplayModal(!displayModal)}
                >
                  <h1>Cart ({state.orders.length})</h1>
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>
      {/* helps shade background, and makes it so that if you click background it closes modal. */}
      <div
        className={`Overlay ${displayModal ? "Show" : "Hide"}`}
        onClick={() => setDisplayModal(!displayModal)}
      />
      <div>
        <CartModal
          closeFunction={() => setDisplayModal(false)}
          displayModal={displayModal}
        />
      </div>
    </App>
  );
}

// export default function HomePage() {
//   const { state, dispatch } = React.useContext(Store);

//   React.useEffect(() => {
//     state.meals.length === 0 && fetchDataAction(dispatch); //if state episodes array is empty, run this function
//   }); //useEffect hook is to get data as soon as user lands on the page

//   const props: IMealProps = {
//     meals: state.meals,
//     store: { state, dispatch },
//     toggleFavAction: toggleFavAction,
//     orders: state.orders,
//   };
//   return (
//     <App path="/">
//       <div>
//         <React.Fragment>
//           <React.Suspense fallback={<div>loading...</div>}>
//             <div className="restaurant-name">Punjabi Dhaba</div>
//             <section className="meal-layout">
//               <MealList {...props} />
//             </section>
//           </React.Suspense>
//         </React.Fragment>
//       </div>
//     </App>
//   );
// }
