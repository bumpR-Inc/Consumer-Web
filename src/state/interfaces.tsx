/**
 * All the interfaces here
 */

export type Dispatch = React.Dispatch<IAction>;

export interface IState {
  meals: Array<IMeal>;
  orders: Array<IMeal>;
  address?: string;
  geocode?: any;
  landing: boolean;
  date: Date;
  restaurants: Array<IRestaurant>;
}

export interface IAction {
  type: string;
  payload: Array<IMeal> | any; //personally, could change to any or somehting else I htink
}

export interface IMeal {
  pk: number;
  foodName: string;
  description: string;
  restaurant: number;
  restaurant_info: {
    pk: number;
    name: string;
    location: string;
    picture_url: string;
    generic_quota_status: boolean;
    quota: number;
  };
  dietaryRestrictions: string;
  picture_url: string;
  price: number;
  popularity: number;
}

export interface IRestaurant {
  pk: number;
  name: string;
  location: string;
  picture_url: string;
  generic_quota_status: boolean;
  quota: number;
}

export interface IMealProps {
  meals: Array<IMeal>;
  store: { state: IState; dispatch: Dispatch };
  toggleFavAction: (state: IState, dispatch: any, meal: IMeal) => IAction;
  orders: Array<IMeal>;
  restaurants: Array<IRestaurant>;
}
