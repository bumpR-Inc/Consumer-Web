import { Menu } from "@material-ui/core";
import React, { useEffect } from "react";
import { fetchDeliveryDateAction } from "../state/Actions";
import { Store } from "../state/Store";
import LandingPage from "./LandingPage/LandingPage";
import OrderingHomePage from "./Ordering/OrderingHomePage";;

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  useEffect(() => {
    fetchDeliveryDateAction(dispatch);
  }, []);

  return state.landing ? <LandingPage /> : <OrderingHomePage/>;
}
