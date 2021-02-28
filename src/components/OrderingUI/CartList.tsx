import React, { useContext } from "react";
import { addOrderItem, subtractMeal } from "../../state/Actions";
import { getUniqueOrderItemIdentifier, IMenuItem, IOrderItem } from "../../state/interfaces";
import CartCard from "./CartCard";
import { makeStyles } from "@material-ui/core/styles";
import { Store } from "../../state/Store";

const useStyles = makeStyles({
  empty: {
    color: 'black',
  },
});


export default function CartList(props: any): Array<JSX.Element> {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  
  interface IUnique {
    [key: string]: {
      quantity: number,
      item: IOrderItem
    }
  }

  let uniques: IUnique = {};
  for (var i = 0; i < state.orders.length; i++) {
    const identifier = getUniqueOrderItemIdentifier(state.orders[i]);
    console.log(i);
    if (identifier in uniques) {
      uniques[identifier].quantity = uniques[identifier].quantity + 1;
    } else {
      uniques[identifier] = {
        quantity: 1,
        item: state.orders[i]
      }
      // // uniques[ifier].quantity = 1;
      // uniques[identidentifier].item = state.orders[i];
    }
  }
  // console.log(state.orders);
  // const menuItemsPks = state.orders.map((menuItem: IOrderItem) => menuItem.menuItem.pk);
  // const uniqueMealsPks = Array.from(new Set<any>(menuItemsPks));
  // const uniqueMealsArray = state.menuItems.filter((curr: IMenuItem) =>
  //   uniqueMealsPks.includes(curr.pk)
  // ); //Important: converts array to set, removing duplicates and then convert back to array

  // const uniqueMealsArray = uniqueMealsPks.map(())

  // var uniqueMealsArray: Array<IMenuItem> = [];
  // var seenPks: Array<Number> = [];
  // var ordersIndex = 0
  // while (ordersIndex < orders.length) {
  //   var currMeal: IMenuItem = orders[ordersIndex];
  //   // if (!seenPks.includes(currMeal.pk)) {
  //     uniqueMealsArray.concat(currMeal);
  //     seenPks.concat(ordersIndex);
  //   // }
  //   ordersIndex = ordersIndex + 1;
  // }

  // const uniqueMealsArray = Array.from(new Set<IMenuItem>(orders)); //Important: converts array to set, removing duplicates and then convert back to array
  // const uniqueMealsArray : Array<IMenuItem> = [] //Important: converts array to set, removing duplicates and then convert back to array

  // const uniqueMealsArray = Array.from(new Set<IMenuItem>(orders)); //og Important: converts array to set, removing duplicates and then convert back to array
  // var seenPks: Array<Number> = [];
  // for (var currMeal in uniqueMealsArray) {
  //   currMeal;
  // }

  //bug: if cache is turned to true in store, in creates differing verisons of the same item with the same key so menuItems can show up multiple times in cart.
  if (Object.keys(uniques).length > 0) {
    return Object.keys(uniques).map((key: string) => {
      return (
        <section key={key}>
          <CartCard
            item={uniques[key].item}
            numInCart={uniques[key].quantity}
            addOnClick={() => {
              let orderItem: IOrderItem = { menuItem: uniques[key].item.menuItem, add_ins: uniques[key].item.add_ins }
              addOrderItem(dispatch, orderItem);
            }}
            subtractOnClick={() => {subtractMeal(state, dispatch, uniques[key].item)}}
          />
        </section>
      );
    }); //
  } else {
    return [<h1 className={classes.empty}>Cart Is Empty</h1>];
  }
}
