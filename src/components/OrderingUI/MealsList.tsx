import React from "react";
import { addOrderItem, openMealModal, subtractMeal } from "../../state/Actions";
import { IMenuItem, IOrderItem } from "../../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";

export default function MealsList(props: any): Array<JSX.Element> {
  const { menuItems, toggleFavAction, orders, store } = props;
  const { state, dispatch } = store;

  return props.menuItemsByRestaurant.map((menuItem: IMenuItem) => {
    var numInCart = orders.filter((curr: IMenuItem) => menuItem.pk === curr.pk).length; //TODO: fix bug, when boolean from app.tsx is on, cart has bug where it displays multiple cards for the same menuItem. might be tied to this part but prob not.
    return (
      <section key={menuItem.pk} className="menuItem-box">
        <Card
          menuItem={menuItem}
          numInCart={numInCart}
          addOnClick={() => {
            if (menuItem.add_ins.length > 0) {
              openMealModal(dispatch, menuItem);
            } else {
              let orderItem: IOrderItem = { menuItem: menuItem, add_ins: [] }
              addOrderItem(dispatch, orderItem);
            }
          }}
          subtractOnClick={() => {subtractMeal(state, dispatch, menuItem)}}
        />
      </section>
    );
  }) ?? <></>;
}



// import React from "react";
// import { addMeal, subtractMeal } from "../state/Actions";
// import { IMenuItem } from "../state/interfaces";
// import Card from "./Card";
// import CartCard from "./CartCard";

// export default function MealsList(props: any): Array<JSX.Element> {
//   const { menuItems, toggleFavAction, orders, store } = props;
//   const { state, dispatch } = store;

//   return (
//     menuItems?.map((menuItem: IMenuItem) => {
//       var numInCart = orders.filter((curr: IMenuItem) => menuItem.pk === curr.pk)
//         .length; //TODO: fix bug, when boolean from app.tsx is on, cart has bug where it displays multiple cards for the same menuItem. might be tied to this part but prob not.
//       return (
//         <section key={menuItem.pk} className="menuItem-box">
//           <Card
//             menuItem={menuItem}
//             numInCart={numInCart}
//             addOnClick={() => addMeal(state, dispatch, menuItem)}
//             subtractOnClick={() => subtractMeal(state, dispatch, menuItem)}
//           />
//         </section>
//       );
//     }) ?? <></>
//   );
// }
