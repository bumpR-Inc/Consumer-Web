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
    // height: '24vh',
    backgroundColor: theme.palette.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
  },
  textWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: '10em',
    fontWeight: 'normal',
    fontFamily: 'Brush',
    margin: '0px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '8em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14vw',
    },
  },
  paperworkWrap: {
    display: 'inline',
  },
  paperwork: {
    // width: '100%',
    color: theme.palette.primary.main,
    fontSize: '3em',
    fontWeight: 'normal',
    fontFamily: 'Playfair',
    margin: '0px',
    textAlign: 'center',
    display: 'inline',
    [theme.breakpoints.down('md')]: {
      fontSize: '3em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '5vw',
    },
  },
});

export default function Footer() {
  var classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.textWrap}>
        <h1 className={classes.text}>
          Order today!
        </h1>
        <div className={classes.paperworkWrap}>
          <a className={classes.paperwork} href="/privacy">Privacy Policy</a>
          <p className={classes.paperwork}> | </p>
          <a className={classes.paperwork} href="/terms">Terms of Service</a>        
        </div>
      </div>
    </div>
  );
}
