import { useContext } from "react";
import { addOrderItem, subtractMeal } from "../../state/Actions";
import { getUniqueOrderItemIdentifier, IOrderItem } from "../../state/interfaces";
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
    if (identifier in uniques) {
      uniques[identifier].quantity = uniques[identifier].quantity + 1;
    } else {
      uniques[identifier] = {
        quantity: 1,
        item: state.orders[i]
      }
    }
  }
  
  if (Object.keys(uniques).length > 0) {
    return Object.keys(uniques).map((key: string) => {
      return (
        <CartCard
            key={key}
            item={uniques[key].item}
            numInCart={uniques[key].quantity}
            addOnClick={() => {
              let orderItem: IOrderItem = { menuItem: uniques[key].item.menuItem, add_ins: uniques[key].item.add_ins }
              addOrderItem(dispatch, orderItem);
            }}
            subtractOnClick={() => {subtractMeal(state, dispatch, uniques[key].item)}}
          />
      );
    }); //
  } else {
    return [<h1 className={classes.empty}>Cart Is Empty</h1>];
  }
}
