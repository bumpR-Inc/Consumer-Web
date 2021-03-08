import { IAction, IMenuItem, IState, IRestaurant, IOrderItem, getUniqueOrderItemIdentifier } from "./interfaces";
import { REACT_APP_BACKEND_API_URL } from '../config';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const fetchDataAction = async (dispatch: any) => {
  //use aync for api calls 2:06
  let URL = `${REACT_APP_BACKEND_API_URL}/menuItems/`;
  let data = await fetch(URL); //fetches URL
  const mealData = await data.json(); //convert to json

  URL = `${REACT_APP_BACKEND_API_URL}/deliveryDay/?next=true`;
  data = await fetch(URL); //fetches URL
  const nextDeliveryDay = await data.json(); //convert to json
  const date = new Date(nextDeliveryDay[0].date);
  console.log(date)
  date.setHours(date.getHours() + 7); // due to pst conversion
  console.log(date)
  
  const payload = {
    meals: mealData,
    date: date
  };

  return dispatch({
    //basically returns this object to our reducer in Store.tsx
    type: "FETCH_DATA",
    payload: payload, //do ._embedded.episodes because we know basedo nthis specific api URL
  });
};

//unused as of 1/9/2021. TODO: implement fully
export const fetchRestaurantsAction = async (dispatch: any) => {
  //use aync for api calls 2:06
  const URL = `${REACT_APP_BACKEND_API_URL}/restaurants/`;
  const data = await fetch(URL); //fetches URL
  const dataJSON = await data.json(); //convert to json
  return dispatch({
    //basically returns this object to our reducer in Store.tsx
    type: "FETCH_RESTAURANTS",
    payload: dataJSON, //do ._embedded.episodes because we know basedo nthis specific api URL
  });
};

export const toggleFavAction = (
  state: IState,
  dispatch: any,
  menuItem: IMenuItem | any
): IAction => {
  const menuItemInFav = state.orders.includes(menuItem);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: menuItem,
  };
  if (menuItemInFav) {
    const favWithoutMeal = state.orders.filter(
      (fav: IOrderItem) => fav.menuItem.pk != menuItem.pk
    ); //filter method removes obj if attribute is true
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: favWithoutMeal,
    };
  }
  return dispatch(dispatchObj);
};

export const openMealModal = (
  dispatch: any,
  menuItem: IMenuItem | any
): IAction => {
  let dispatchObj = {
    type: "OPEN_MEAL_MODAL",
    payload: menuItem,
  };
  return dispatch(dispatchObj);
};

export const closeMealModal = (
  dispatch: any,
): IAction => {
  let dispatchObj = {
    type: "CLOSE_MEAL_MODAL",
  };
  return dispatch(dispatchObj);
};

//need to fix and find a way to associate number of menuItems with each menuItem TODO/fix/bug. maybe can just add menuItem and then in the favs/order screen just combine the duplicates?
export const addOrderItem = (
  dispatch: any,
  item: IOrderItem | any
): IAction => {
  // const episodeInFav = state.orders.includes(episode);
  let dispatchObj = {
    type: "ADD_ORDER_ITEM",
    payload: item,
  };
  return dispatch(dispatchObj);
};

//need to fix and find a way to associate number of menuItems with each menuItem TODO/fix/bug. maybe can just add menuItem and then in the favs/order screen just combine the duplicates?
export const subtractMeal = (
  state: IState,
  dispatch: any,
  item: IOrderItem | any
): IAction => {
  // const episodeInFav = state.orders.includes(episode);
  // let dispatchObj = {
  //   type: "SUBTRACT_MEAL",
  //   payload: episode,
  // };
  // return dispatch(dispatchObj);
  const orderItemIdentifiers : Array<String> = state.orders.map((item: IOrderItem) => getUniqueOrderItemIdentifier(item));
  const menuItemInOrders : boolean = orderItemIdentifiers.includes(getUniqueOrderItemIdentifier(item));
  let dispatchObj = {
    type: "NO_CHANGE", //extra measure so that if there's no menuItem in orders, you can't subtract one
    payload: item, //don't really need because NO_CHANGE doesn't use episode
  };

  if (menuItemInOrders) {
    var idx = state.orders.findIndex((curr: IOrderItem) => getUniqueOrderItemIdentifier(curr) === getUniqueOrderItemIdentifier(item)); //gets index of first instance of menuItem
    const ordersMinusOneMeal = state.orders;
    ordersMinusOneMeal.splice(idx, 1); //removes first intance of the passed in menuItem

    dispatchObj = {
      type: "SUBTRACT_MEAL",
      payload: ordersMinusOneMeal,
    };
  }
  return dispatch(dispatchObj);
};

export const goToMenu = async (
  dispatch: any,
  address: string,
  geocode: any
) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "GO_TO_MENU",
    payload: { address: address, geocode: geocode },
  });
};

export const fromMenu = async (
  dispatch: any,
) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "FROM_MENU",
    payload: { },
  });
};

export const updateAddress = async (
  dispatch: any,
  address: string,
  geocode: any
) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "UPDATE_ADDRESS",
    payload: { address: address, geocode: geocode },
  });
};

export const setDate = async (
  dispatch: any,
  date: Date,
) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "SET_DATE",
    payload: { date: date },
  });
};

export const toMobileUpdateAddressPage = async (
  dispatch: any,
) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "TO_MOBILE_UPDATE_ADDRESS_PAGE",
    // payload: { date: date },
  });
};

export const fromMobileUpdateAddressPage = async (
  dispatch: any,
) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "FROM_MOBILE_UPDATE_ADDRESS_PAGE",
    // payload: { date: date },
  });
};

export const setTotalCost = async (dispatch: any, totalCost: number) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "SET_TOTAL_COST",
    payload: { totalCost: totalCost },
  });
};

export const setOrderCode = async (dispatch: any, orderCode: string) => {
  return dispatch({
    //redirects to menu page, while settign the address and geocode
    type: "SET_ORDER_CODE",
    payload: { orderCode: orderCode },
  });
};

export const clearOrderData = async (dispatch: any) => {
  return dispatch({
    type: "CLEAR_ORDER_DATA",
  })
}

export const toOrderHistory = async (dispatch: any) => {
  return dispatch({
    type: "TO_ORDER_HISTORY",
  })
}

export const fromOrderHistory = async (dispatch: any) => {
  return dispatch({
    type: "FROM_ORDER_HISTORY",
  })
}


export const setReferralCode = async (dispatch: any, referralCode : string) => {


  return dispatch({
    type: "SET_REFERRAL_CODE",
    payload: { referralCode: referralCode },
  });
};


export const setReferralModal = async (dispatch: any, referralModal : boolean) => {
  return dispatch({
    type: "SET_REFERRAL_MODAL",
    payload: { referralModal: referralModal },
  });
};
