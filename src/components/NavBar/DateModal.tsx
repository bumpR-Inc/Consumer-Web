import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import React, { useState, PointerEvent } from "react";
import { Store } from "../../state/Store";
import DayPicker, { DayModifiers, FunctionModifier } from 'react-day-picker';
import './nav-style.css';
import { theme } from "../../components/Theme";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { setDate } from "../../state/Actions";

const useStyles = makeStyles({
  popover: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    background: 'none',
    boxShadow: 'none !important'
  }
});


interface DateModalProps {
  anchor: any,
  handleClose: () => void
}

export default function DateModal({anchor, handleClose}: DateModalProps) {
  const { state, dispatch } = React.useContext(Store);
  // const [date, setDate] = useState<Date>(new Date());
  
  var classes = useStyles();

  const dateOnConfirm = (day: Date, {valid} : DayModifiers) => {
    if (valid) {
      setDate(dispatch, day);
      handleClose();
    }    
  }

  function valid(day: Date) {
    return day.getDay() === 1 && day > new Date();
  }
  
  const modifiersStyles = {
    days: {
      color: 'green'
    },
    today: {
      color: 'black',
      backgroundColor: fade(theme.palette.primary.main, 0.3)
    },
    selected: {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    valid: {
      color: theme.palette.primary.main,
    },
    
  };



  return (
    <div>
      <React.Fragment>
        <Popover
          className={classes.popover}
          open={Boolean(anchor)}
          onClose={handleClose}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <DayPicker
            month={state.date}
            onDayClick={dateOnConfirm}
            selectedDays={state.date}
            modifiers={{valid}}
            modifiersStyles={modifiersStyles}
          />
        </Popover>
      </React.Fragment>
    </div>
  );
}
