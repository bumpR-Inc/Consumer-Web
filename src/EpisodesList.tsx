import React from "react";
import { addMeal, subtractMeal } from "./Actions";
import { IEpisode } from "./interfaces";
import Card from "./components/Card";
import CartCard from "./components/CartCard";


export default function EpisodesList(props: any): Array<JSX.Element> {
  const { episodes, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  return episodes.map((episode: IEpisode) => {
    var numInCart = orders.filter((curr: IEpisode) => episode.id === curr.id)
        .length;
    return (
      <section key={episode.id} className="episode-box">
        <Card
          episode={episode}
          numInCart={numInCart}
          addOnClick={() => addMeal(state, dispatch, episode)}
          subtractOnClick={() => subtractMeal(state, dispatch, episode)}
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