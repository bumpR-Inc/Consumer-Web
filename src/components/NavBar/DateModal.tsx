import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DayInput from "../Input/DayInput";
import { theme } from "../Theme";

const useStyles = makeStyles({
  popover: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    background: 'none',
    boxShadow: 'none !important',
    height: '100%',
  },
  dialogCard: {
    background: theme.palette.secondary.main,
    padding: '7vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogTitle: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontSize: '27px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '5.5vw'
    }
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
        {
          window.innerWidth >= theme.breakpoints.values.md
          ? <Popover
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
        
        : <Dialog
          // className={classes.popover}
          open={Boolean(anchor)}
          onClose={handleClose}
          // anchorEl={anchor}
          // anchorOrigin={{
          //   vertical: 'bottom',
          //   horizontal: 'right',
          // }}
          // transformOrigin={{
          //   vertical: 'top',
          //   horizontal: 'right',
          // }}
        >
          <div className={classes.dialogCard}>
            <h1 className={classes.dialogTitle}>Select Delivery Date</h1>
            <DayInput handleSelect={handleClose}/>
          </div>
        </Dialog> }
      </React.Fragment>
    </div>
  );
}
