import React from "react";
import { addMeal, subtractMeal } from "../state/Actions";
import { IMeal } from "../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";

export default function CartList(props: any): Array<JSX.Element> {
  const { meals, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  const uniqueMealsArray = Array.from(new Set<IMeal>(orders)); //Important: converts array to set, removing duplicates and then convert back to array

  return uniqueMealsArray.map((meal: IMeal) => {
    var numInCart = orders.filter((curr: IMeal) => meal.pk === curr.pk).length;
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
}
