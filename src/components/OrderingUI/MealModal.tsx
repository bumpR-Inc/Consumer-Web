import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Dialog from "@material-ui/core/Dialog";
import React, { useContext } from "react";
import DayInput from "../Input/DayInput";
import { theme } from "../Theme";
import { Store } from "../../state/Store";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { IAddIn, IOrderItem } from "../../state/interfaces";
import { addOrderItem } from "../../state/Actions";

const useStyles = makeStyles({
  popover: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    background: 'none',
    boxShadow: 'none !important',
    height: '100%',
  },
  dialog: {
  },
  dialogCard: {
    background: theme.palette.info.main,
    padding: '6%',
    paddingTop: '6%',
    paddingBottom: '6%',
    display: 'flex',
    flexDirection: 'column',
  },
  dialogTitle: {
    color: theme.palette.primary.main,
    fontSize: '4em',
    margin: '0px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3em'
    }
  },
  dialogImage: {
    height: '30vh',
    objectFit: 'cover',
    marginTop: '1vw',
    borderRadius: '10px'
  },
  dialogDescription: {
    color: theme.palette.secondary.main,
    fontSize: '2em',
    fontFamily: 'Playfair',
    marginTop: '1vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7em'
    }
  },
  addIn: {
    fontFamily: 'Playfair !important',
  },
  addButton: {
    marginTop: '1vw',
    backgroundColor: theme.palette.primary.main,
    height: '5vh',
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    color: theme.palette.info.main,
    fontFamily: 'Playfair',
    fontSize: '2em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7em'
    },
    cursor: "pointer"
  }
});


interface MealModalProps {
  handleClose: () => void
}

export default function MealModal({ handleClose }: MealModalProps) {
  const classes = useStyles();
  const { dispatch, state } = useContext(Store);
  var add_ins: Set<IAddIn> = new Set<IAddIn>();

  return (
    <div>
      <React.Fragment>
        <Dialog
          open={true}
          onClose={handleClose}
          fullWidth={true}
          className={classes.dialog}
        >
          <div className={classes.dialogCard}>
            <h1 className={classes.dialogTitle}>{state.menuItemInModal.foodName}</h1>
            <img src={state.menuItemInModal.picture_url} className={classes.dialogImage} />
            <p className={classes.dialogDescription}>{state.menuItemInModal.description}</p>
            <ThemeProvider theme={theme}>
              {
                state.menuItemInModal.add_ins.map((addIn: IAddIn, index: number) => {
                  return <FormControlLabel
                    className={classes.addIn}
                    control={<Checkbox checked={state.checkedA} onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                      if (checked) {
                        add_ins.add(addIn);
                      } else {
                        add_ins.delete(addIn);
                      }
                    }} name="checkedA" />}
                    label={`${addIn.name} (\$${addIn.price})`}
                  />
                })
              }
            </ThemeProvider> 
            <button className={classes.addButton} onClick={() => {
              const item: IOrderItem = {
                menuItem: state.menuItemInModal,
                add_ins: Array.from(add_ins),
              }
              addOrderItem(dispatch, item);
              handleClose();
            }}>Add To Cart</button>
            {/* <DayInput handleSelect={handleClose}/> */}
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
