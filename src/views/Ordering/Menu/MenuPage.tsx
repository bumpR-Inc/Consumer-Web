import React, { useEffect, useState } from "react";
import CartModal from "../../../components/OrderingUI/CartModal";
import { closeCart, closeMealModal, fetchMealsAction, fetchRestaurantsAction, openCart, toggleFavAction } from "../../../state/Actions";
import { IMenuItemProps } from "../../../state/interfaces";
import { Store } from "../../../state/Store";
import MenuWrapper from "./Wrapper";
import { theme } from "../../../components/Theme";
import MealModal from "../../../components/OrderingUI/MealModal";
import OrderCountdown from "../../../components/OrderCountdown";
import GroupOrderAlert from "../../../components/GroupOrdering/GroupOrderAlert";
import Loading from "../../../components/Loading";
import MealListByRestaurant from "../../../components/OrderingUI/MealListByRestaurant";
import GroupOrderModal from "../../../components/GroupOrdering/GroupOrderModal";

export default function MenuPage() {
  const { state, dispatch } = React.useContext(Store);

  useEffect(() => {
    window.analytics.track('MENU_PAGE_OPENED', {
      host: window.location.hostname,
      state: state,
    });
  }, [state]);


  //end of OAuth-enabled function to submit order

  const [fetched, setFetched] = useState<boolean>(false);
  const [groupOrderModal, setGroupOrderModal] = useState<boolean>(state.orders.length == 0);

  React.useEffect(() => {
    // if (state.menuItems?.length === 0 ?? false) {
      //if state menuItems array is empty, run these functions to fill up state.
    if (!fetched) {
      fetchMealsAction(dispatch);
      fetchRestaurantsAction(dispatch);
      setFetched(true);
    }
    // }
  },[fetched, dispatch]); //useEffect hook is to get data as soon as user lands on the page

  const props: IMenuItemProps = {
    menuItems: state.menuItems,
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
            {
              fetched ?
                (<MealListByRestaurant {...props}/>) :
                (<div style={{ 'height': '60vh', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Loading primary={true}/>
                </div>)
            }
            {
              state.orders.length > 0 && 
              (<div className="bottom-cart-btn-wrapper">
                <div className="cart-button-wrapper">
                  <div
                    className="cart-button"
                    onClick={() => {
                      state.cartOpen ? closeCart(dispatch) : openCart(dispatch)
                    }}
                  >
                    <h1>Cart ({state.orders.length})</h1>
                  </div>
                </div>
                </div>)
            }
            {
              (window.innerWidth > theme.breakpoints.values.sm || state.orders.length <= 0) &&
              <>
                <OrderCountdown />
                {/* <GroupOrderAlert /> */}
              </>
            }
          </React.Fragment>
        </div>
      </div>

      { state.menuItemInModal && 
        <MealModal handleClose={() => {closeMealModal(dispatch)}}/>
      }

      {
        state.orders.length == 0 && groupOrderModal &&
        <GroupOrderModal handleClose={() => setGroupOrderModal(false)}/>
      }


      {/* helps shade background, and makes it so that if you click background it closes modal. */}
      <div
        className={`Overlay ${state.cartOpen ? "Show" : "Hide"}`}
        onClick={() => {
          state.cartOpen ? closeCart(dispatch) : openCart(dispatch)
        }}
      />
      <div>
        <CartModal/>
      </div>
      <div className="menu-buffer"></div>

    
      
    </MenuWrapper>
  );
}