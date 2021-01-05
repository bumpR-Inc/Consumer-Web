import React from "react";
import { Store } from "../state/Store";
import LandingPage from "./LandingPage";
import MenuPage from "./MenuPage";

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  return (
    state.landing ? <LandingPage /> : <MenuPage />
  )
}
