import { makeStyles } from "@material-ui/core/styles";
import { title } from "process";
import React from "react";
import texture from "../../assets/img/texture.png";
import { theme } from "../../components/Theme";


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '17vh',
    backgroundColor: theme.palette.info.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: '10em',
    fontWeight: 'normal',
    fontFamily: 'Mighty Brush',
    margin: '0px',
  },
});

export default function Footer() {
  var classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>
        Order today!
      </h1>
    </div>
  );
}