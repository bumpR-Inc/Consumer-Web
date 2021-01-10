import React from "react";
import { addMeal, subtractMeal } from "../state/Actions";
import { IMeal } from "../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";


export default function MealsList(props: any): Array<JSX.Element> {
  const { meals, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  return meals.map((meal: IMeal) => {
    var numInCart = orders.filter((curr: IMeal) => meal.pk === curr.pk).length;
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
  }); //           
}



// export default function EpisodesList(props: any): Array<JSX.Element> {
//   const { episodes, toggleFavAction, orders, store} = props;
//   const {state, dispatch} = store
//   return episodes.map((episode: IEpisode) => {
//     return (
//       <section key={episode.id} className="episode-box">
//         <Card />
//         <img
//           src={episode.image.medium}
//           alt={"Rick and Morty ${episode.name}"}
//         />
//         <div>{episode.name}</div>
//         <section style={{ display: "flex", justifyContent: "space-between" }}>
//           <div>
//             Season: {episode.season} Number: {episode.number}
//           </div>
//           {/* <button type="button" onClick={() => toggleFavAction(state, dispatch, episode)}>
//             {orders.find((fav: IEpisode) => fav.id == episode.id)
//               ? "Unfav"
//               : "Fav"}
//           </button> */}
          
//           <button
//             type="button"
//             onClick={() => addMeal(state, dispatch, episode)}
//           >
//             +
//           </button>
//           {orders.filter((curr: IEpisode) => episode.id === curr.id).length}
//           <button
//             type="button"
//             onClick={() => subtractMeal(state, dispatch, episode)}
//           >
//             -
//           </button>
//         </section>
//       </section>
//     );
//   });
// }
// //TODO: display number of orders next to each one / only show number if greater than 1.