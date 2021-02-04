import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "1.4rem",
    minWidth: "2.5vw",
    backgroundColor: "green",
    borderRadius: ".4rem",
    margin: ".2rem",
    paddingLeft: ".7rem",
    paddingRight: ".7rem"

  },
  textStyle: {
    fontFamily: "Playfair",
    fontSize: ".95rem",
    color: "white",
  }
});
export default function MealPropertyTag(props : any) {
    let classes = useStyles();

    return (
        <div className={classes.container}>
            <p className={classes.textStyle}>{props.text}</p>
        </div>
    )
}
