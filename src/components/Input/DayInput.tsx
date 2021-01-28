import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import React, { useState, PointerEvent } from "react";
import { Store } from "../../state/Store";
import DayPicker, { DayModifiers, FunctionModifier } from 'react-day-picker';
import './input-style.css';
import { theme } from "../Theme";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { setDate } from "../../state/Actions";


interface DateModalProps {
  handleSelect: () => void
}

export default function DayInput({handleSelect}: DateModalProps) {
  const { state, dispatch } = React.useContext(Store);
  
  const dateOnConfirm = (day: Date, {valid} : DayModifiers) => {
    if (valid) {
      setDate(dispatch, day);
      handleSelect();
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
    <DayPicker
      month={state.date}
      onDayClick={dateOnConfirm}
      selectedDays={state.date}
      modifiers={{ valid }}
      modifiersStyles={modifiersStyles}
    />
  );
}