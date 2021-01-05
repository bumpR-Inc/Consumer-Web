import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import background from "../assets/img/landing-background.jpg";
import { Hidden } from "@material-ui/core";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { createLessThan } from "typescript";
import { useAuth0 } from "@auth0/auth0-react";
import { getDistance } from 'geolib';
import { Store } from "../state/Store";
import { goToMenu } from "../state/Actions";

const thresh: number = 12;

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  hero: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    height: '60vh',
    width: '100vw',
    margin: '0px !important',

    display: "flex",
    flexDirection: "column",
    gap: '4%'
  },
  navContainer: {
    width: '100%',
    // flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  navBuffer: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    flex: 2,
  },
  title: {
    fontFamily: 'Playfair Display',
    margin: '0px !important',
    textAlign: 'center',
    fontSize: '7em',
    color: '#FFFBF5',
  },
  signInContainer: {
    zIndex: 1,
    width: '100%',
    top: 0,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  signIn: {
    fontFamily: 'Playfair Display',
    textAlign: 'right',
    fontSize: '3em',
    color: '#FFFBF5',
    margin: '6%',
    "&:hover": {
      textDecoration: 'underline',
    }
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "1vh",
    // backgroundColor: 'red',

    // alignItems: 'center',
    // flex: 2,
  },
  address: {
    backgroundColor: '#FFFBF5',
    justifyContent: 'center',
    border: "none",
    width: "60vw",
    height: "10vh",

    borderRadius: '5px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
    padding: '2%',

    fontFamily: 'Playfair Display',
    fontSize: '4em',
    color: '#545453',

    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
  },
  addressSuggestionBox: {
    backgroundColor: '#FFFBF5',
    border: "none",
    width: '60vw',
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
    color: '#545453',
    fontSize: '4em',
    width: '60vw',
    padding: '2%',

    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    // backgroundColor: 'pink',


    // "&hover": {
    //   backgroundColor: 'pink',
    // }
  },
  heroBuffer: {
    flex: 1
  },
  validAddressButton: {
    backgroundColor: '#C9512B',
    color: '#FFFBF5',
    border: "none",
    width: '60vw',
    padding: '2%',
    borderRadius: '5px',
    fontFamily: 'Playfair Display',
    fontSize: '4em',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
  },
  invalidAddressButton: {
    backgroundColor: '#BC2F2F',
    color: '#FFFBF5',
    border: "none",
    width: '60vw',
    padding: '2%',
    borderRadius: '5px',
    fontFamily: 'Playfair Display',
    fontSize: '4em',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
  }
});

export default function LandingPage() {
  const { state, dispatch } = React.useContext(Store);

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  var classes = useStyles();
  var [addressState, handleAddressChange] = useState<string>('');
  var [geocode, handleGeocodeChange] = useState<any>(null);
  var [validAddress, setValidAddress] = useState<boolean>(false);
  var [coveredAddress, setCoveredAddress] = useState<boolean>(false);

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
  <div>
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.hero}>

          <div className={classes.navContainer}>
            <div className={classes.navBuffer}></div>
            <div className={classes.titleContainer}>
              <h1 className={classes.title}>Good Neighbor.</h1>
            </div>
            <div className={classes.signInContainer}>
              {!isAuthenticated && (
                  <h1 
                    className={classes.signIn}
                    onClick={() => loginWithRedirect()}
                  >
                    Sign In.
                  </h1>
                )}
            </div>
          </div>
          <PlacesAutocomplete
              value={addressState}
              onChange={handleAddressChange}
              onSelect={handleAddressSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className={classes.addressContainer}>
                  <input
                    className={classes.address}
                    {...getInputProps({
                      placeholder: 'Enter Delivery Address',
                      // className: 'location-search-input',
                    })}
                  />
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
                            <a href="">
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
          {/* <div className={classes.heroBuffer}></div> */}
        </div>
      </div>
    </React.Fragment>
  </div>)
  ;
}
