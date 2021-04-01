import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import AppFooter from "../../../components/AppFooter";
import { makeStyles } from "@material-ui/core";
import { theme } from "../../../components/Theme";

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
  const classes = useStyles();  

  return (
    <React.Fragment>
      <NavBar/>
      <div className={classes.bodyContainer}>
        {props.children}
        <AppFooter/>
      </div>
    </React.Fragment>
  );
}
