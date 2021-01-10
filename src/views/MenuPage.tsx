import React from "react";
import { Store } from "../state/Store";

import { IMealProps } from "../state/interfaces";
import { fetchDataAction, toggleFavAction } from "../state/Actions";
import App from "../App";

const MealList = React.lazy<any>(() => import("../components/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.meals.length === 0 && fetchDataAction(dispatch); //if state episodes array is empty, run this function
  }); //useEffect hook is to get data as soon as user lands on the page

  const props: IMealProps = {
    meals: state.meals,
    store: { state, dispatch },
    toggleFavAction: toggleFavAction,
    orders: state.orders,
  };
  return (
    <App path="/">
      <div>
        <React.Fragment>
          <React.Suspense fallback={<div>loading...</div>}>
            <div className="restaurant-name">Punjabi Dhaba</div>
            <section className="meal-layout">
              <MealList {...props} />
            </section>
          </React.Suspense>
        </React.Fragment>
      </div>
    </App>
  );
}

// export default function HomePage() {
//   const { state, dispatch } = React.useContext(Store);

//   React.useEffect(() => {
//     state.meals.length === 0 && fetchDataAction(dispatch); //if state episodes array is empty, run this function
//   }); //useEffect hook is to get data as soon as user lands on the page

//   const props: IMealProps = {
//     meals: state.meals,
//     store: { state, dispatch },
//     toggleFavAction: toggleFavAction,
//     orders: state.orders,
//   };
//   return (
//     <App path="/">
//       <div>
//         <React.Fragment>
//           <React.Suspense fallback={<div>loading...</div>}>
//             <div className="restaurant-name">Punjabi Dhaba</div>
//             <section className="meal-layout">
//               <MealList {...props} />
//             </section>
//           </React.Suspense>
//         </React.Fragment>
//       </div>
//     </App>
//   );
// }
