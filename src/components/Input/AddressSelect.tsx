import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel, CheckCircle, Loop, Room } from "@material-ui/icons";
import { getDistance } from 'geolib';
import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,

  getLatLng
} from 'react-places-autocomplete';
import motto from "../../assets/img/landing/motto.png";
import { theme } from "../Theme";
import { Store } from "../../state/Store";
import { useHistory } from "react-router-dom";

const thresh: number = 12;

const useStyles = makeStyles({
  container: {
    // backgroundColor: 'green',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3%',
  },
  mottoContainer: {

  },
  motto: {
    height: 'auto',
    width: '90vw',
    maxWidth: '800px',

    [theme.breakpoints.down('sm')]: {
      width: '95vw',
    }
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "95vw",
    maxWidth: theme.breakpoints.values.md.toString() + 'px',
    gap: "1vh",
  },
  hideMottoButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.palette.info.main,
    border: "none",
    height: "100%",
    width: '80%',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',

    borderRadius: '25px',

    '&:hover': {
      color: 'black',
    },
  },
  addressInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.palette.info.main,
    border: "none",
    height: "10vh",
    width: '100%',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',

    borderRadius: '5px',
  },
  mottoHideButton: {
    '&hover': {
      color: theme.palette.primary.main,
    }
  },
  pinIconContainer: {
    width: "7%",
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '10%',
    },
  },
  pinIcon: {
    color: theme.palette.secondary.main,
    fontSize: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  hideMottoButton: {
    fontFamily: 'Playfair-Bold',
    fontSize: '4em',
    color: theme.palette.secondary.main,
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5em',
    },
  },
  address: {
    outline: 'none',
    backgroundColor: 'transparent',
    border: "none",
    width: "86%",
    height: "10vh",

    borderRadius: '5px',

    fontFamily: 'Playfair Display',
    fontSize: '4em',
    color: theme.palette.secondary.main,

    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '2.5em',
    },
  },
  validityIconContainer: {
    height: '100%',
    width: "7%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '10%',
    },
  },
  loadingIcon: {
    color: theme.palette.primary.main,
    fontSize: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  validIcon: {
    color: theme.palette.success.main,
    fontSize: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  validIconNavbar: {
    color: theme.palette.info.main,
    fontSize: '2em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  invalidIcon: {
    color: theme.palette.error.main,
    fontSize: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  addressSuggestionBox: {
    backgroundColor: theme.palette.info.main,
    border: "none",
    width: '100%',
    borderRadius: '5px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',

    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    "&hover": {
      backgroundColor: 'pink',
    }
  },
  addressSuggestionItem: {
    fontFamily: 'Playfair Display',
    color: theme.palette.secondary.main,
    fontSize: '4em',
    padding: '2%',
    width: '100%',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5em',
    },
  },
  heroBuffer: {
    flex: 1
  },
  validAddressButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.info.main,
    border: "none",
    width: '100%',
    padding: '2%',
    borderRadius: '5px',
    fontFamily: 'Playfair Display',
    fontSize: '4em',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5em',
    },
  },
  validAddressButtonNavbar: {
    backgroundColor: theme.palette.success.main,
    border: "none",
    height: '100%',
    width: '100%',
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    }
  },
  invalidAddressLink: {
    width: '100%',
  },
  invalidAddressButton: {
    width: '100%',
    border: "none",
    padding: '2%',

    backgroundColor: theme.palette.error.main,
    color: theme.palette.info.main,
    borderRadius: '5px',
    fontFamily: 'Playfair Display',
    fontSize: '4em',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5em',
    },
  }
});

interface AddressSelectProps {
  landing: boolean,
  miniButton: boolean,
  onConfirm: (address: string, geocode: any) => void
}

export default function AddressSelect({ landing, miniButton, onConfirm }: AddressSelectProps) {  
  let history = useHistory();
  let classes = useStyles();
  let [addressState, handleAddressChange] = useState<string>('');
  let [geocode, handleGeocodeChange] = useState<any>(null);
  let [validAddress, setValidAddress] = useState<boolean>(false);
  let [coveredAddress, setCoveredAddress] = useState<boolean>(false);
  let [showMotto, setShowMotto] = useState<boolean>(landing);

  let setGeocode = (latLng: any) => {
    console.log(latLng);
    let distance: number = getDistance({ latitude: 37.872055, longitude: -122.260013 }, latLng);
    console.log(distance);
    handleGeocodeChange(latLng);
    setCoveredAddress(distance <= 1500);
    setValidAddress(true);
  }

  let setAddressError = (error: any) => {
    console.log(error);
    setValidAddress(false);
  }

  let handleAddressSelect = (address: string) => {
    handleAddressChange(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setGeocode(latLng))
      .catch(error => setAddressError(error));
  };

  return (
    <div className={classes.container} style={{justifyContent: showMotto ? 'center' : 'flex-start'}}>
      {showMotto && <div>
          <img src={motto} className={classes.motto} />
      </div>}
      <PlacesAutocomplete
          value={addressState}
          onChange={handleAddressChange}
          onSelect={handleAddressSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={classes.addressContainer}>
              {showMotto
                ? (
                  <div className={classes.hideMottoButtonContainer} onClick={() =>
                    setShowMotto(false)
                    // {history.push("https://goodneighborsubs.typeform.com/to/PgA4qzJo")}
                  }>
                  <h1 className={classes.hideMottoButton}>
                    View Selection
                    {/* Coming Soon! */}
                  </h1>
                  </div>
                )
                : (<div className={classes.addressInputContainer}>
                    <div className={classes.pinIconContainer}>
                      <Room className={classes.pinIcon}></Room>
                    </div>
                    <input ref={input => input && input.focus()}
                      className={classes.address}
                      {...getInputProps({
                        placeholder: 'Enter Delivery Address',
                        // className: 'location-search-input',
                      })}
                    />
                    <div className={classes.validityIconContainer}>
                      {loading ?
                        (<Loop className={classes.loadingIcon}></Loop>)
                        : (addressState !== '' && (
                          (geocode && coveredAddress)
                          ? (
                            !miniButton
                              ? (<CheckCircle className = { classes.validIcon } ></CheckCircle>)
                              : (<button className={classes.validAddressButtonNavbar} onClick={() => onConfirm(addressState, geocode)}>
                                  <CheckCircle className={classes.validIconNavbar}></CheckCircle>
                                </button>)
                          )
                            : (<Cancel className={classes.invalidIcon}></Cancel>)
                        ))
                      }
                    </div>
                  </div>
                )
              }
                
              {(loading || suggestions.length > 0) ? (<div className={classes.addressSuggestionBox}>
                {loading && <div className={classes.addressSuggestionItem}>Loading...</div>}
                {suggestions.map((suggestion, myKey) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div className={classes.addressSuggestionItem}
                    // key={myKey}
                    
                      {...getSuggestionItemProps(suggestion, {
                        // className,
                        // style,
                      })}
                    >
                      <span onClick={() => handleAddressSelect(suggestion.description) }>{suggestion.description}</span>
                    </div>
                  );
                })}
                </div>)
                : (
                  (!miniButton && geocode) && 
                  (
                    (coveredAddress) ? 
                      (
                        <button className={classes.validAddressButton} onClick={() => onConfirm(addressState, geocode)}>
                          {landing ? 'View Menu' : 'Update Address'}
                        </button>
                      )
                    :
                      (
                        <a href="" className={classes.invalidAddressLink}>
                          <button className={classes.invalidAddressButton}>
                            We don't deliver there... yet. <br/> Click to fill out update form!
                          </button>
                        </a>
                      )
                  )
                )
              }
            </div>
          )}
        </PlacesAutocomplete>
    </div>
  );
}
