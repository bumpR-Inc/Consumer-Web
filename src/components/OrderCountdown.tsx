import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { Fade, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Schedule } from "@material-ui/icons";
import Countdown, { zeroPad } from 'react-countdown';
import { theme } from "./Theme";
import { Store } from "../state/Store";

const useStyles = makeStyles({
  fade: {

  },
  snackbar: {

  },
  alert: {
    fontSize: '2em',
    maxWidth: '330px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5em'
    }
  },
  icon: {
    fontSize: '2.5em',
    alignSelf: 'center',
    color: 'red',

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7em'
    }
  }
});

export default function OrderCountdown() {
  var classes = useStyles();
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const { state } = useContext(Store);

  const renderer = ({ days, hours, minutes, seconds, completed }:
    { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      return( <div></div>);
    } else {
      return <><span style={{fontWeight: 'bold'}}>{days} Days</span>
        <span> and </span>
        <span style={{fontWeight: 'bold'}}>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        <span> left to order for {state.date.toDateString().split(' 202')[0]} </span></>;
    }
  };

  return (
    <Fade in={true} timeout={{enter: 600}} style={{ transitionDelay: '1000ms' }}>
      <Snackbar open={alertOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => {setAlertOpen(false)}}>
        <Alert className={classes.alert} onClose={() => { setAlertOpen(false) }} severity="error" icon={
          <Schedule className={classes.icon} />
        }>
          <Countdown date={state.date} renderer={renderer}/>
        </Alert>
      </Snackbar>
    </Fade>
  );
}
