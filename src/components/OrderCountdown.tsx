import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Fade, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Schedule } from "@material-ui/icons";
import Countdown, { zeroPad } from 'react-countdown';

const useStyles = makeStyles({
  
});

export default function OrderCountdown() {
  var classes = useStyles();
  const [alertOpen, setAlertOpen] = useState<boolean>(true);

  const currentDate: Date = new Date();
  let initialDate: Date = new Date(currentDate.getTime());
  initialDate.setDate(currentDate.getDate() + (7 + 1 - currentDate.getDay()) % 7);
  initialDate.setHours(0);
  initialDate.setMinutes(0);
  initialDate.setSeconds(0);
  initialDate.setMilliseconds(0);
  console.log(initialDate);

  const renderer = ({ days, hours, minutes, seconds, completed }:
    { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      return( <div></div>);
    } else {
      return <><span style={{fontWeight: 'bold'}}>{days} Days</span>
        <span> and </span>
        <span style={{fontWeight: 'bold'}}>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        <span> left to order for {initialDate.toDateString().split(' 202')[0]} </span></>;
    }
  };

  return (
    <Fade in={true} timeout={{enter: 600}} style={{ transitionDelay: '1000ms' }}>
      <Snackbar open={alertOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => {setAlertOpen(false)}}>
        <Alert onClose={() => { setAlertOpen(false)}} severity="error" style={{fontSize: '2em', maxWidth: '330px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)'}} icon={<Schedule style={{fontSize: '2.5em', alignSelf: 'center', color: 'red'}}/>}>
          <Countdown date={initialDate} renderer={renderer}/>
        </Alert>
      </Snackbar>
    </Fade>
  );
}
