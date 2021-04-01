/**
 * All the interfaces here
 */

export type Dispatch = React.Dispatch<IAction>;

export interface IState {
  menuItems: Array<IMenuItem>;
  orders: Array<IOrderItem>;
  // address?: string;
  // geocode?: any;
  // landing: boolean;
  orderHistory: boolean;
  mobileUpdateAddressPage: boolean;
  date: Date;
  restaurants: Array<IRestaurant>;
  totalCost: number;
  orderCode: string;
  menuItemInModal?: any;
  referralCode: string;
  referralModal: boolean;
  cartOpen: boolean;
}

export interface IAction {
  type: string;
  payload: Array<IMenuItem> | any; //personally, could change to any or somehting else I htink
}

export interface IOrderItem {
  menuItem: IMenuItem,
  add_ins: Array<IAddIn>
}

export interface IProfile {
  pk: number,
  user: number,
  name: string,
  email: string,
  address: string,
  phoneNumber: number
}

export const getUniqueOrderItemIdentifier = (item: IOrderItem) => {
  const addInPks = item.add_ins.map((add_in: IAddIn) => add_in.pk);
  return item.menuItem.pk.toString() + "_" + addInPks.sort().join("_");
}

export const compareOrderItems = (i1: IOrderItem, i2: IOrderItem) => {
  return i1.menuItem.pk === i2.menuItem.pk && compareAddIns(i1.add_ins, i2.add_ins);
} 

function compareAddIns(_arr1: Array<IAddIn>, _arr2: Array<IAddIn>) {
  if (
    !Array.isArray(_arr1)
    || !Array.isArray(_arr2)
    || _arr1.length !== _arr2.length
    ) {
      return false;
    }
  
  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
       }
  }
  
  return true;
}

export interface IMenuItem {
  pk: number;
  foodName: string;
  description: string;
  restaurant: {
    pk: number;
    name: string;
    location: string;
    picture_url: string;
    generic_quota_status: boolean;
    quota: number;
  };
  add_ins: Array<IAddIn>;
  dietaryRestrictions: string;
  picture_url: string;
  price: number;
  popularity: number;
}

export interface IAddIn {
  pk: number;
  name: string;
  price: number;
}

export interface IRestaurant {
  pk: number;
  name: string;
  location: string;
  picture_url: string;
  generic_quota_status: boolean;
  quota: number;
}

export interface IMenuItemProps {
  menuItems: Array<IMenuItem>;
  store: { state: IState; dispatch: Dispatch };
  toggleFavAction: (state: IState, dispatch: any, menuItem: IMenuItem) => IAction;
  orders: Array<IMenuItem>;
  restaurants: Array<IRestaurant>;
}

export interface IGroup {
  pk?: number,
  members_info: Array<IProfile>
}

export interface ILocation {
  address?: string,
  geocode?: string,
}