import React from 'react'
import { Store } from "./Store";
import {IEpisodeProps } from "./interfaces";
import {toggleFavAction} from './Actions'



const EpisodeList = React.lazy<any>(() => import("./EpisodesList")); //react lazy isntead of normal importing. see suspense and fallback below


export default function OrdersPage(): JSX.Element {
    const { state, dispatch } = React.useContext(Store);



    
    const props = {
        episodes: state.orders,//do this instead of state.episodes for just the orders
        store: {state, dispatch},
        toggleFavAction,
        orders: state.orders
        //bascially looping over favorites, and if we click on unfavorite, then we get rid of it
    }

    
    return (
        <React.Suspense fallback={<div>loading...</div>}>

            <div className="episode-layout">
                <EpisodeList {...props} />
            </div>
        </React.Suspense>

    )
}
