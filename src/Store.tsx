import React from "react";
import { IState, IAction } from "./interfaces";

const initialState: IState = {
  episodes: [],
  orders: [],
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    case "ADD_FAV":
      return { ...state, orders: [...state.orders, action.payload] };
    case "REMOVE_FAV":
      return { ...state, orders: action.payload };
    case "ADD_MEAL":
      return { ...state, orders: [...state.orders, action.payload] };
    case "SUBTRACT_MEAL":
      return { ...state, orders: action.payload };
    case "NO_CHANGE":
      return state;
    default:
      return state;
  }
}

export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}

