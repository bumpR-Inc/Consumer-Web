/**
 * All the interfaces here
 */

export type Dispatch = React.Dispatch<IAction>

export interface IState {
  episodes: Array<IEpisode>;
  orders: Array<IEpisode>;
  address?: string;
  geocode?: any;
  landing: boolean;
}

export interface IAction {
  type: string;
  payload: Array<IEpisode> | any;//personally, could change to any or somehting else I htink
}

export interface IEpisode {//copied from api documentation
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  type: string;
  url: string;
}

export interface IEpisodeProps {
  episodes: Array<IEpisode>;
  store: {state: IState, dispatch: Dispatch}
  toggleFavAction: (state: IState, dispatch: any, episode: IEpisode) => IAction;
  orders: Array<IEpisode>;
}