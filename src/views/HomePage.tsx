import React from "react";
import { Store } from "../state/Store";
import LandingPage from "./LandingPage/LandingPage";
import AddressUpdate from "./Ordering/AddressUpdate";
import MenuPage from "./Ordering/MenuPage";

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  return state.landing ? <LandingPage /> : (state.mobileUpdateAddressPage ? <AddressUpdate/> : <MenuPage />);
}
