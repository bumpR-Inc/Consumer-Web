import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import { Cancel, CheckCircle, Loop, Room } from "@material-ui/icons";
import { getDistance } from 'geolib';
import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,

  getLatLng
} from 'react-places-autocomplete';
import background from "../../assets/img/landing-background.jpg";
import motto from "../../assets/img/motto.png";
import { theme } from "../../components/Theme";
import { goToMenu } from "../../state/Actions";
import { Store } from "../../state/Store";
import NavBar from "./NavBar";

const thresh: number = 12;

const useStyles = makeStyles({
  mottoContainer: {

  },
  motto: {
    height: 'auto',
    width: 'auto'
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "95vw",
    maxWidth: theme.breakpoints.values.md.toString() + 'px',
    gap: "1vh",
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

    borderRadius: '5px',
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
    fontFamily: 'Playfair Display',
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
    // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',

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
    width: "7%",
    display: 'flex',
    justifyContent: 'center',
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

export default function AddressSelect() {
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
  const { state, dispatch } = React.useContext(Store);

  var classes = useStyles();
  var [addressState, handleAddressChange] = useState<string>('');
  var [geocode, handleGeocodeChange] = useState<any>(null);
  var [validAddress, setValidAddress] = useState<boolean>(false);
  var [coveredAddress, setCoveredAddress] = useState<boolean>(false);
  var [showMotto, setShowMotto] = useState<boolean>(true);

  var setGeocode = (latLng: any) => {
    console.log(latLng);
    var distance: number = getDistance({ latitude: 37.872055, longitude: -122.260013 }, latLng);
    console.log(distance);
    handleGeocodeChange(latLng);
    setCoveredAddress(distance <= 1500);
    setValidAddress(true);
  }

  var setAddressError = (error: any) => {
    console.log(error);
    setValidAddress(false);
  }

  var handleAddressSelect = (address: string) => {
    handleAddressChange(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setGeocode(latLng))
      .catch(error => setAddressError(error));
  };

  return (
  <>
  
    {showMotto && <div>
        <img src={motto} />
    </div>}
    <PlacesAutocomplete
        value={addressState}
        onChange={handleAddressChange}
        onSelect={handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.addressContainer}>
            <div className={classes.addressInputContainer} onClick={() => setShowMotto(false)}>
              
              {showMotto
                ? (<h1 className={classes.hideMottoButton}>View Selection</h1>)
                : (<>
                    <div className={classes.pinIconContainer}>
                      <Room className={classes.pinIcon}></Room>
                    </div>
                    <input
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
                            ? (<CheckCircle className={classes.validIcon} ></CheckCircle>)
                            : (<Cancel className={classes.invalidIcon}></Cancel>)
                        ))
                      }
                    </div>
                  </>)
              }
              
            </div>
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
                geocode && 
                (
                  (coveredAddress) ? 
                    (
                      <button className={classes.validAddressButton} onClick={() => goToMenu(dispatch, addressState, geocode)}>
                        View Menu
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
    </>
  );
}
