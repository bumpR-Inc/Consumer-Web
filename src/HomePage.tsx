import React from "react";
import { Store } from "./Store";

import {IEpisodeProps } from "./interfaces";
import {fetchDataAction, toggleFavAction} from './Actions'

const EpisodeList = React.lazy<any>(() => import("./EpisodesList")); //react lazy isntead of normal importing. see suspense and fallback below


export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction(dispatch); //if state episodes array is empty, run this function
  }); //useEffect hook is to get data as soon as user lands on the page

  const props: IEpisodeProps = {
    episodes: state.episodes,
    store: {state, dispatch},
    toggleFavAction: toggleFavAction,
    orders: state.orders,
  };
  return (
  <div>
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="restaurant-name">Punjabi Dhaba</div>
        <section className="episode-layout">
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </React.Fragment>

  </div>)
  ;
}
