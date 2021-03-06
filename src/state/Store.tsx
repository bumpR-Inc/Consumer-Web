import React from "react";
import { IState, IAction } from "./interfaces";

const currentSchemaVersion: number = 0;
const cacheState: boolean = true;
const currentDate: Date = new Date();
let initialDate: Date = new Date(currentDate.getTime());
initialDate.setDate(currentDate.getDate() + (7 + 1 - currentDate.getDay()) % 7);
initialDate.setHours(0);
initialDate.setMinutes(0);
initialDate.setSeconds(0);
initialDate.setMilliseconds(0);


var initialState: IState = {
  menuItems: [],
  orders: [],
  address: "Set Location",
  geocode: undefined,
  landing: true,
  orderHistory: false,
  mobileUpdateAddressPage: false,
  date: initialDate,
  restaurants: [],
  totalCost: 0,
  orderCode: "", //filled in cartmodal,
  menuItemInModal: undefined,
  referralCode: "",//filled in cartmodal
};

var localState = localStorage.getItem("state");
var stateSchemaVersion: number = parseInt(localStorage.getItem("stateSchemeVersion") ?? "-1");
if (localState != null && cacheState && stateSchemaVersion === currentSchemaVersion) {
  initialState = JSON.parse(localState);
  initialState.date = new Date(JSON.parse(localState).date);
  if (initialState.date <= new Date()) {
    initialState.date = initialDate
  }
} else {
  localStorage.setItem("stateSchemeVersion", currentSchemaVersion.toString());
  var stateStringified = JSON.stringify(initialState);
  localStorage.setItem("state", stateStringified);
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "FETCH_DATA":
      state = { ...state, menuItems: action.payload };
      break;
    case "FETCH_RESTAURANTS":
      state = { ...state, restaurants: action.payload };
      break;
    case "ADD_FAV":
      state = { ...state, orders: [...state.orders, action.payload] };
      break;
    case "REMOVE_FAV":
      state = { ...state, orders: action.payload };
      break;
    case "ADD_ORDER_ITEM":
      state = { ...state, orders: [...state.orders, action.payload] };
      break;
    case "SUBTRACT_MEAL":
      state = { ...state, orders: action.payload };
      break;
    case "GO_TO_MENU":
      state = {
        ...state,
        address: action.payload["address"],
        geocode: action.payload["geocode"],
        landing: false,
      };
      break;
    case "FROM_MENU":
      state = {
        ...state,
        landing: true,
      };
      break;
    case "OPEN_MEAL_MODAL":
      state = { ...state, menuItemInModal: action.payload };
      break;
    case "CLOSE_MEAL_MODAL":
      state = { ...state, menuItemInModal: undefined };
      break;
    case "TO_MOBILE_UPDATE_ADDRESS_PAGE":
      state = {
        ...state,
        mobileUpdateAddressPage: true,
      };
      break;
    case "FROM_MOBILE_UPDATE_ADDRESS_PAGE":
      state = {
        ...state,
        mobileUpdateAddressPage: false,
      };
      break;
    case "UPDATE_ADDRESS":
      state = {
        ...state,
        address: action.payload["address"],
        geocode: action.payload["geocode"],
      };
      break;
    case "SET_DATE":
      state = {
        ...state,
        date: action.payload["date"],
      };
      break;
    case "CLEAR_ORDER_DATA":
      state = {
        ...state,
        orders: [],
        orderCode: "",
        totalCost: 0,
      };
      break;
    case "SET_TOTAL_COST":
      state = {
        ...state,
        totalCost: action.payload["totalCost"],
      };
      break;
    case "SET_ORDER_CODE":
      state = {
        ...state,
        orderCode: action.payload["orderCode"],
      };
      break;
    case "TO_ORDER_HISTORY":
      state = {
        ...state,
        orderHistory: true,
      };
      break;
    case "FROM_ORDER_HISTORY":
      state = {
        ...state,
        orderHistory: false,
      };
      break;
    case "SET_REFERRAL_CODE":
      state = {
        ...state,
        referralCode: action.payload["referralCode"],
      };
      break;
    case "NO_CHANGE":
      state = state;
      break;
    default:
      state = state;
      break;
  }

  var stateStringified = JSON.stringify(state);
  localStorage.setItem("state", stateStringified);
  console.log(state);

  return state;
}

export function StoreProvider(
  props: JSX.ElementChildrenAttribute
): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
