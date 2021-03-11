import React, { RefObject, useEffect, useRef, useState } from "react";
import { addOrderItem, subtractMeal } from "../../state/Actions";
import { IMenuItem, IRestaurant } from "../../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";
import { theme } from "../Theme";
import { makeStyles } from "@material-ui/core/styles";
import RestaurantList from "./RestaurantList";
import MealsList from "./MealsList";

// import MealsList from "./MealsList";

// const MealList = React.lazy<any>(() => import("./MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

const useStyles = makeStyles({
  restaurantText: {
    color: "#c9512b",
    fontFamily: "Playfair",
    fontSize: "46px",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "0px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      fontSize: "34px",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: "34px",
    },
  },
});

export default function MealListByRestaurant(props: any) {
  const classes = useStyles();
  const { menuItems, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;
  const [ refs, setRefs ] = useState<Array<RefObject<HTMLElement>>>([]);
  
  useEffect(() => {
    let _refs: Array<RefObject<HTMLElement>> = [];
    for (let i = 0; i < state.restaurants.length; i++) {
      _refs.push(React.createRef());
    }
    setRefs(_refs);
  }, []);

  return (
    <>
      <RestaurantList refs={refs}/>
      {
        state.restaurants.map((currRestaurant: IRestaurant, index: number) => {
          var menuItemsByRestaurant : Array<IRestaurant> = [];
          menuItemsByRestaurant = state.menuItems.filter(
            (curr: IMenuItem) => curr.restaurant.name === currRestaurant?.name
          );
          return (
            <section key={currRestaurant.pk} ref={refs[index]}>
              <div>
                <div className={classes.restaurantText}>{currRestaurant.name}</div>
                <div className="restaurant-line"></div>
                <div>
                  <section className="menuItem-layout">
                    <MealsList {...props} menuItemsByRestaurant={menuItemsByRestaurant} />
                  </section>
                </div>
              </div>
            </section>
          );
        })
      }
    </>
  );
}
