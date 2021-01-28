import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import React from "react";
import DayInput from "../Input/DayInput";

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

export default function DateModal({ anchor, handleClose }: DateModalProps) {
  const classes = useStyles();

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
          <DayInput handleSelect={handleClose}/>
        </Popover>
      </React.Fragment>
    </div>
  );
}
