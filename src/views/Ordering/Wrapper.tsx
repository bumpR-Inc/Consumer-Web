import React from "react";
import { Store } from "../../state/Store";
// import "../../index.css";
import NavBar from "../../components/NavBar/NavBar";
import AppFooter from "../../components/AppFooter";
import { makeStyles } from "@material-ui/core";
import { theme } from "../../components/Theme";
import OrderCountdown from "../../components/OrderCountdown";

const EpisodeList = React.lazy<any>(() => import("../../components/OrderingUI/MealsList")); //react lazy isntead of normal importing. see suspense and fallback below

const useStyles = makeStyles({
  bodyContainer: {
    height: '92vh',   
    overflow: 'scroll',
      
    [theme.breakpoints.down('sm')]: {
      height: '88vh'
    }
  },
});

export default function MenuWrapper(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store); //can remove "dispatch"
  const classes = useStyles();  

  return (
    <React.Fragment>
      <NavBar/>
      <div className={classes.bodyContainer}>
        {props.children}
        <AppFooter/>
      </div>
      <OrderCountdown/>
    </React.Fragment>
  );
}
