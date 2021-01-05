import { IAction, IEpisode, IState } from "./interfaces";

 export const fetchDataAction = async (dispatch: any) => {
    //use aync for api calls 2:06
    const URL =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(URL); //fetches URL
    const dataJSON = await data.json(); //convert to json
    return dispatch({
      //basically returns this object to our reducer in Store.tsx
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes, //do ._embedded.episodes because we know basedo nthis specific api URL
    });
  };

  export const toggleFavAction = (state:IState, dispatch: any, episode: IEpisode | any): IAction => {
    const episodeInFav = state.orders.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode,
    };
    if (episodeInFav) {
      const favWithoutEpisode = state.orders.filter(
        (fav: IEpisode) => fav.id != episode.id
      ); //filter method removes obj if attribute is true
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode,
      };
    }
    return dispatch(dispatchObj);
  };

  //need to fix and find a way to associate number of meals with each meal TODO/fix/bug. maybe can just add meal and then in the favs/order screen just combine the duplicates?
  export const addMeal = (state:IState, dispatch: any, episode: IEpisode | any): IAction => {
    // const episodeInFav = state.orders.includes(episode);
    let dispatchObj = {
      type: "ADD_MEAL",
      payload: episode,
    };
    return dispatch(dispatchObj);
  };

    //need to fix and find a way to associate number of meals with each meal TODO/fix/bug. maybe can just add meal and then in the favs/order screen just combine the duplicates?
  export const subtractMeal = (state:IState, dispatch: any, episode: IEpisode | any): IAction => {
    // const episodeInFav = state.orders.includes(episode);
    // let dispatchObj = {
    //   type: "SUBTRACT_MEAL",
    //   payload: episode,
    // };
    // return dispatch(dispatchObj);


    const mealInOrders = state.orders.includes(episode);
    let dispatchObj = {
      type: "NO_CHANGE",//extra measure so that if there's no meal in orders, you can't subtract one
      payload: episode,//don't really need because NO_CHANGE doesn't use episode
    };
    if (mealInOrders) {
      var idx = state.orders.findIndex((curr: IEpisode) => curr.id === episode.id);//gets index of first instance of meal
      const ordersMinusOneMeal = state.orders;
      ordersMinusOneMeal.splice(idx, 1);//removes first intance of the passed in meal

      dispatchObj = {
        type: "SUBTRACT_MEAL",
        payload: ordersMinusOneMeal,
      };
    }
    return dispatch(dispatchObj);
  };
    
  export const goToMenu = async (dispatch: any, address: string, geocode: any) => {
    return dispatch({
      //redirects to menu page, while settign the address and geocode
      type: "GO_TO_MENU",
      payload: {"address": address, "geocode": geocode}
    });
  };