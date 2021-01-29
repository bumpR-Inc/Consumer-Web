import React from "react";
import { addMeal, subtractMeal } from "../../state/Actions";
import { IMeal, IRestaurant } from "../../state/interfaces";
import Card from "./Card";
import CartCard from "./CartCard";
// import MealsList from "./MealsList";

const MealList = React.lazy<any>(() => import("./MealsList")); //react lazy isntead of normal importing. see suspense and fallback below


export default function MealListByRestaurant(props: any): Array<JSX.Element> {

    const { meals, toggleFavAction, orders, store } = props;
    const { state, dispatch } = store;

    return state.restaurants.map((currRestaurant: IRestaurant) => {
        var mealsByRestaurant : Array<IRestaurant> = [];
        mealsByRestaurant = state.meals.filter(
          (curr: IMeal) => curr.restaurant_info.name === currRestaurant.name
        );
        return (
          <section key={currRestaurant.pk}>
            <div>
              <div className="restaurant-name">{currRestaurant.name}</div>
              <div className="restaurant-line"></div>
              <div>
                <section className="meal-layout">
                  <MealList {...props} mealsByRestaurant={mealsByRestaurant} />
                </section>
              </div>
            </div>
          </section>
        );
    })
}
