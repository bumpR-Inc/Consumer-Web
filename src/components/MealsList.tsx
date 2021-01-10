import React from "react";
import { addMeal, subtractMeal } from "../state/Actions";
import { IMeal } from "../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";

export default function MealsList(props: any): Array<JSX.Element> {
  const { meals, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  return meals.map((meal: IMeal) => {
    var numInCart = orders.filter((curr: IMeal) => meal.pk === curr.pk).length; //TODO: fix bug, when boolean from app.tsx is on, cart has bug where it displays multiple cards for the same meal. might be tied to this part but prob not.
    return (
      <section key={meal.pk} className="meal-box">
        <Card
          meal={meal}
          numInCart={numInCart}
          addOnClick={() => addMeal(state, dispatch, meal)}
          subtractOnClick={() => subtractMeal(state, dispatch, meal)}
        />
      </section>
    );
  });
}
