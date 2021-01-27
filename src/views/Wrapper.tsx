import React from "react";
import { Store } from "../state/Store";
import "../index.css";
import NavBar from "../components/NavBar/NavBar";

const EpisodeList = React.lazy<any>(() => import("../components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

export default function MenuWrapper(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store); //can remove "dispatch"
  console.log(state);

  return (
    <React.Fragment>
      <NavBar/>
      {props.children}
    </React.Fragment>
  );
}
