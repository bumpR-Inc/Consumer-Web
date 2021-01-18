import React from "react";
import { isPartiallyEmittedExpression } from "typescript";
import { Store } from "./state/Store";
import { IAction, IMeal, IMealProps } from "./state/interfaces";
import { Link } from "@reach/router";
import logo from "./assets/img/logo-blob.png";
// import "./App.css";
import Card from "./components/Card";
import "./index.css";

const EpisodeList = React.lazy<any>(() => import("./components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

export default function App(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store); //can remove "dispatch"
  console.log(state);

  return (
    <React.Fragment>
      {/* <header className="header"> */}
      <header className="header">
        <div>GN Logo and maybe dropdown Here</div>
        <div className="nav-link-container">
          <Link to="/" className="nav-text">
            Menu
          </Link>
        </div>
        <div className="nav-link-container">
          <Link to="/orders" className="nav-text">
            Orders: {state.orders.length}
          </Link>
        </div>
      </header>
      {props.children}
    </React.Fragment>
  ); //?not really sure about props.children
}
