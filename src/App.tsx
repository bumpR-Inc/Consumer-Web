import React from "react";
import { isPartiallyEmittedExpression } from "typescript";
import { Store } from "./Store";
import { IAction, IEpisode, IEpisodeProps } from "./interfaces";
import { Link } from "@reach/router";
import logo from "./assets/logo-blob.png";
import "./App.css";
import Card from './components/Card';

const EpisodeList = React.lazy<any>(() => import("./EpisodesList")); //react lazy isntead of normal importing. see suspense and fallback below

export default function App(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store); //can remove "dispatch"
  console.log(state);

  return (
    <React.Fragment>
      {/* <header className="header"> */}
      <header className="Custom-header">
          <div>
            GN Logo and maybe dropdown Here
          </div>
          <div>
            <Link to="/" className="Nav-text">
              Menu
            </Link>
          </div>
          <div>
            <Link to="/orders" className="Nav-text">
              Orders: {state.orders.length}
            </Link>
          </div>
      </header>
      {props.children}
    </React.Fragment>
  ); //?not really sure about props.children
}
