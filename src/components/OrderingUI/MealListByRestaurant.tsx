import React, { useRef } from "react";
import { addOrderItem, subtractMeal } from "../../state/Actions";
import { IMenuItem, IRestaurant } from "../../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";
import { theme } from "../Theme";
import { makeStyles } from "@material-ui/core/styles";

// import MealsList from "./MealsList";

const MealList = React.lazy<any>(() => import("./MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

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

export default function MealListByRestaurant(props: any): Array<JSX.Element> {

    var classes = useStyles();
    const { menuItems, toggleFavAction, orders, store } = props;
    const { state, dispatch } = store;

    return state.restaurants.map((currRestaurant: IRestaurant) => {
        var menuItemsByRestaurant : Array<IRestaurant> = [];
        menuItemsByRestaurant = state.menuItems.filter(
          (curr: IMenuItem) => curr.restaurant.name === currRestaurant?.name
        );
      return (
        <section key={currRestaurant.pk}>
            <div>
              <div className={classes.restaurantText}>{currRestaurant.name}</div>
              <div className="restaurant-line"></div>
              <div>
                <section className="menuItem-layout">
                  <MealList {...props} menuItemsByRestaurant={menuItemsByRestaurant} />
                </section>
              </div>
            </div>
          </section>
        );
    })
}
