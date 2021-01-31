import React from "react";
import App from "../../App";
import CartModal from "../../components/OrderingUI/CartModal";
import { fetchDataAction, fetchRestaurantsAction, toggleFavAction } from "../../state/Actions";
import { IMealProps } from "../../state/interfaces";
import { Store } from "../../state/Store";
import MenuWrapper from "./Wrapper";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios'

const MealList = React.lazy<any>(() => import("../../components/OrderingUI/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below
const MealListByRestaurant = React.lazy<any>(() => import("../../components/OrderingUI/MealListByRestaurant")); //react lazy isntead of normal importing. see suspense and fallback below


export default function MenuPage() {
  //start of OAuth stuff
  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  // const callApi = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();

  //     const response = await fetch(`http://localhost:3001/api/private`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const responseData = await response.json();
  //     console.log(responseData);
  //   } catch (error) {
  //     console.log("Error in using auth token to hit private endpoint.");
  //   }
  // };
  const callApi = async () => {

    try {
      const token = await getAccessTokenSilently();

      axios.get('http://localhost:3001/api/private', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {console.log(response);
      })

    } catch (error) {
      console.log("Error in using auth token to hit private endpoint.");
    }
  };
  //end of OAuth test stuff

  //start of OAuth-enabled function to submit order
  const submitOrder = async () => {
    try {
      const token = await getAccessTokenSilently();

      axios
        .post("http://localhost:3001/api/orderscreate", {
          restaurant: 1,
          deliveryTime: "date placeholder",
          location: "address placeholder",
          menuItems: [1],
          pricePaid: 10.00
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log("Error in submitting post request for order");
    }
  };

  //end of OAuth-enabled function to submit order

  const { state, dispatch } = React.useContext(Store);
  const [displayModal, setDisplayModal] = React.useState(false);

  React.useEffect(() => {
    if (state.meals?.length === 0 ?? false) {
      //if state meals array is empty, run these functions to fill up state.
      fetchDataAction(dispatch);
      fetchRestaurantsAction(dispatch);
    }
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
            <React.Suspense fallback={<div>loading...</div>}>
              <MealListByRestaurant {...props} />
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
      <button onClick={submitOrder}>OAuth private endpoint tester</button>
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
