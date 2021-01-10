import React from "react";
import { IState, IAction } from "./interfaces";

const cacheState: boolean = true;

var initialState: IState = {
  meals: [],
  orders: [],
  address: undefined,
  geocode: undefined,
  landing: true
};

var localState = localStorage.getItem('state');
if (localState != null && cacheState) {
  initialState = JSON.parse(localState);
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "FETCH_DATA":
      state = { ...state, meals: action.payload }; 
      break;
    case "ADD_FAV":
      state = { ...state, orders: [...state.orders, action.payload] };
      break;
    case "REMOVE_FAV":
      state = { ...state, orders: action.payload };
      break;
    case "ADD_MEAL":
      state = { ...state, orders: [...state.orders, action.payload] };
      break;
    case "SUBTRACT_MEAL":
      state = { ...state, orders: action.payload };
      break;
    case "GO_TO_MENU": 
      state = {...state, address: action.payload['address'], geocode: action.payload['geocode'], landing: false}
      break;
    case "NO_CHANGE":
      state = state;
      break;
    default:
      state = state;
      break;

    }

    var stateStringified = JSON.stringify(state)
    localStorage.setItem('state', stateStringified);

    return state;
}

export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}

