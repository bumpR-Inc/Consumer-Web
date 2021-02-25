import React, { useContext, useEffect, useState } from "react";
import App from "../../App";
import CartModal from "../../components/OrderingUI/CartModal";
import { fetchDataAction, fetchRestaurantsAction, toggleFavAction } from "../../state/Actions";
import { IMealProps } from "../../state/interfaces";
import { Store } from "../../state/Store";
import MenuWrapper from "./Wrapper";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios'
import { CircularProgress, SwipeableDrawer, ThemeProvider } from "@material-ui/core";
import { REACT_APP_BACKEND_API_URL } from '../../config';
import { theme } from "../../components/Theme";

const MealList = React.lazy<any>(() => import("../../components/OrderingUI/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const MealListByRestaurant = React.lazy<any>(() => import("../../components/OrderingUI/MealListByRestaurant")); //react lazy isntead of normal importing. see suspense and fallback below

export default function MenuPage() {
  //start of OAuth stuff
  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const { state, dispatch } = React.useContext(Store);

  useEffect(() => {
    window.analytics.track('MENU_PAGE_OPENED', {
      host: window.location.hostname,
      state: state,
    });
  }, []);


  //end of OAuth-enabled function to submit order

  const [displayModal, setDisplayModal] = React.useState(false);
  const [fetched, setFetched] = useState<boolean>(false);

  React.useEffect(() => {
    // if (state.meals?.length === 0 ?? false) {
      //if state meals array is empty, run these functions to fill up state.
    if (!fetched) {
      fetchDataAction(dispatch);
      fetchRestaurantsAction(dispatch);
      setFetched(true);
    }
    // }
  }); //useEffect hook is to get data as soon as user lands on the page

  const props: IMealProps = {
    meals: state.meals,
    store: { state, dispatch },
    toggleFavAction: toggleFavAction,
    orders: state.orders,
    restaurants: state.restaurants,
  };

  return (
    <MenuWrapper path="/">
      <div className="menu-full-flex-container">
        <div className="menu-constrained-container">
          <React.Fragment>
            <React.Suspense fallback={
              <div style={{ 'height': '60vh', margin: 'auto'}}>
                <ThemeProvider theme={theme}>
                  <CircularProgress color="primary" />
                </ThemeProvider>
              </div>
            }>
              <MealListByRestaurant {...props} />
            </React.Suspense>
            {
              state.orders.length > 0 && 
              (<div className="bottom-cart-btn-wrapper">
                <div className="cart-button-wrapper">
                  <div
                    className="cart-button"
                    onClick={() => {
                      window.analytics.track('CART_OPENED', {
                        host: window.location.hostname,
                        state: state,
                        cart: state.orders
                      });
                      setDisplayModal(!displayModal)
                    }}
                  >
                    <h1>Cart ({state.orders.length})</h1>
                  </div>
                </div>
              </div>)
            }
          </React.Fragment>
        </div>
      </div>
      {/* helps shade background, and makes it so that if you click background it closes modal. */}
      <div
        className={`Overlay ${displayModal ? "Show" : "Hide"}`}
        onClick={() => {
          window.analytics.track('CART_CLOSED', {
            host: window.location.hostname,
            state: state,
            cart: state.orders
          });
          setDisplayModal(!displayModal);
        }}
      />
      <div>
        <CartModal
          closeFunction={() => {
            window.analytics.track('CART_CLOSED', {
              host: window.location.hostname,
              state: state,
              cart: state.orders
            });
            setDisplayModal(false);
          }}
          displayModal={displayModal}
        />
      </div>
      <div className="menu-buffer"></div>
      
    </MenuWrapper>
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
