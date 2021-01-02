import React from "react";
import { addMeal, subtractMeal } from "./Actions";
import { IEpisode } from "./interfaces";
import Card from "./components/Card";
import CartCard from "./components/CartCard";

export default function CartList(props: any): Array<JSX.Element> {
  const { episodes, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  const uniqueMealsArray = Array.from(new Set<IEpisode>(orders)); //Important: converts array to set, removing duplicates and then convert back to array

  return uniqueMealsArray.map((episode: IEpisode) => {
    var numInCart = orders.filter((curr: IEpisode) => episode.id === curr.id)
      .length;
    return (
      <section key={episode.id}>
        <CartCard
          episode={episode}
          numInCart={numInCart}
          addOnClick={() => addMeal(state, dispatch, episode)}
          subtractOnClick={() => subtractMeal(state, dispatch, episode)}
        />
      </section>
    );
  }); //
}
