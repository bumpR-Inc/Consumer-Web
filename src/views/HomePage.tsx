import { Menu } from "@material-ui/core";
import React from "react";
import { Store } from "../state/Store";
import LandingPage from "./LandingPage/LandingPage";
import OrderHistory from "./OrderHistory/OrderHistory";
import AddressUpdate from "./Ordering/AddressUpdate";
import MenuPage from "./Ordering/MenuPage";

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  return state.landing ? <LandingPage /> : (state.mobileUpdateAddressPage ? <AddressUpdate /> : (
    state.orderHistory ? <OrderHistory/> : <MenuPage/>
    ));
}
