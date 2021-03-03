import Popover from "@material-ui/core/Popover";
import React, { useState, PointerEvent } from "react";
import { Store } from "../../state/Store";
import DayPicker, { DayModifiers, FunctionModifier } from 'react-day-picker';
import './input-style.css';
import { theme } from "../Theme";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { setDate } from "../../state/Actions";
import axios from "axios";
import { REACT_APP_BACKEND_API_URL } from "../../config";
import { CircularProgress } from "@material-ui/core";
import Loading from "../Loading";


interface DateModalProps {
  handleSelect: () => void
}

export default function DayInput({handleSelect}: DateModalProps) {
  const { state, dispatch } = React.useContext(Store);
  const [ fetched, setFetched ] = useState<boolean>(false);
  const [ days, setDays ] = useState<any[]>([]);
  const [ month, setMonth ] = useState<Date>(state.date);

  React.useEffect(() => {
    if (!fetched) {
      (async () => {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API_URL}/deliveryDay/?month=${month.getMonth()+1}&year=${month.getFullYear()}`,
        );
        // console.log(response);
        // console.log(response.data[0].items_info)

        setDays(response.data);
        setFetched(true);     
      })();
    }
  });
  
  const dateOnConfirm = (day: Date, {valid} : DayModifiers) => {
    if (valid) {
      window.analytics.track('DATE_CONFIRMED', {
        host: window.location.hostname,
        state: state,
        address: state.address,
        geocode: state.geocode,
        landing: state.landing
      });
      setDate(dispatch, day);
      handleSelect();
    }    
  }

  function valid(day: Date) {
    for (var i = 0; i < days.length; i++) {
      console.log(`${days[i].date} vs ${day.toISOString()}`);
      if (day.toISOString().includes(days[i].date) && day > new Date()) {
        return true;
      }
    }
    return false
    // return day.getDay() === 1 && day > new Date();
  }

  function onMonthChange(date: Date) {
    setMonth(date);
    setFetched(false);
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
  
  if (fetched) {
    return (
      <DayPicker
        month={month}
        onDayClick={dateOnConfirm}
        selectedDays={state.date}
        modifiers={{ valid }}
        modifiersStyles={modifiersStyles}
        onMonthChange={onMonthChange}
      />
    );
  } else {
    return (<Loading primary={true}/>);
  }
}