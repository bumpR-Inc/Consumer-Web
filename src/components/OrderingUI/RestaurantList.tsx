import React, { RefObject, useContext } from "react";
import { addOrderItem, subtractMeal } from "../../state/Actions";
import { IMenuItem, IRestaurant } from "../../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";
import { theme } from "../Theme";
import { makeStyles } from "@material-ui/core/styles";
import RestaurantCard from "./RestaurantCard";
import { Store } from "../../state/Store";

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
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // alignContent: 'space-evenly'
  }
});

interface IRestaurantList {
  refs: Array<RefObject<HTMLElement>>
}

export default function RestaurantList({refs}: IRestaurantList) {
  var classes = useStyles();
  const { state } = useContext(Store);
  
  return (
    <section>
      <div className={classes.restaurantText}>Restaurants</div>
      <div className="restaurant-line"></div>
      <div className={classes.cardContainer}>
        {
          state.restaurants.map((restaurant: IRestaurant, index: number) => {
            return (<RestaurantCard restaurant={restaurant} refs={refs} index={index} />);
          })
        }
      </div>
    </section>
  );
}
