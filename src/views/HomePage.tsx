import { Menu } from "@material-ui/core";
import React from "react";
import { Store } from "../state/Store";
import LandingPage from "./LandingPage/LandingPage";
import OrderingHomePage from "./Ordering/OrderingHomePage";;

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  return state.landing ? <LandingPage /> : <OrderingHomePage/>;
}
