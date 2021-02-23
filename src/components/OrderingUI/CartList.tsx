import React from "react";
import { addMeal, subtractMeal } from "../../state/Actions";
import { IMeal } from "../../state/interfaces";
import CartCard from "./CartCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  empty: {
    color: 'black',
  },
});


export default function CartList(props: any): Array<JSX.Element> {
  const classes = useStyles();
  const { meals, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  const mealsPks = orders.map((meal: IMeal) => meal.pk);
  const uniqueMealsPks = Array.from(new Set<any>(mealsPks));
  const uniqueMealsArray = state.meals.filter((curr: IMeal) =>
    uniqueMealsPks.includes(curr.pk)
  ); //Important: converts array to set, removing duplicates and then convert back to array

  // const uniqueMealsArray = uniqueMealsPks.map(())

  // var uniqueMealsArray: Array<IMeal> = [];
  // var seenPks: Array<Number> = [];
  // var ordersIndex = 0
  // while (ordersIndex < orders.length) {
  //   var currMeal: IMeal = orders[ordersIndex];
  //   // if (!seenPks.includes(currMeal.pk)) {
  //     uniqueMealsArray.concat(currMeal);
  //     seenPks.concat(ordersIndex);
  //   // }
  //   ordersIndex = ordersIndex + 1;
  // }

  // const uniqueMealsArray = Array.from(new Set<IMeal>(orders)); //Important: converts array to set, removing duplicates and then convert back to array
  // const uniqueMealsArray : Array<IMeal> = [] //Important: converts array to set, removing duplicates and then convert back to array

  // const uniqueMealsArray = Array.from(new Set<IMeal>(orders)); //og Important: converts array to set, removing duplicates and then convert back to array
  // var seenPks: Array<Number> = [];
  // for (var currMeal in uniqueMealsArray) {
  //   currMeal;
  // }

  //bug: if cache is turned to true in store, in creates differing verisons of the same item with the same key so meals can show up multiple times in cart.
  if (uniqueMealsArray.length > 0) {
    return uniqueMealsArray.map((meal: IMeal) => {
      var numInCart = orders.filter((curr: IMeal) => meal.pk === curr.pk)
        .length;
      return (
        <section key={meal.pk}>
          <CartCard
            meal={meal}
            numInCart={numInCart}
            addOnClick={() => addMeal(state, dispatch, meal)}
            subtractOnClick={() => subtractMeal(state, dispatch, meal)}
          />
        </section>
      );
    }); //
  } else {
    return [<h1 className={classes.empty}>Cart Is Empty</h1>];
  }
}
