//vendor
import React, { Component } from 'react';

//react-async-script-loader
import scriptLoader from 'react-async-script-loader';

//material-ui-next
import { mapStyles } from '../mapStyles.js';
import { withStyles } from 'material-ui/styles'

//Components
import MapDrawer from '../Components/MapDrawer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// prop-types
import PropTypes from 'prop-types';

//stylesheet
import './App.css';

/**
 * JSS styles
 */
const styles = {
  
  gmaps:{
    height: '100%',
  },
  map: {
    margins: 'auto',
    width: '100%',
    height: 'calc(100% - 230px)',
    overflow: 'none',
    position: 'absolute'
  },
  app_container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  mapError: {
    fontStyle: 'italic',
    paddingTop: 400,
    textAlign: 'center'
  },
  mapLoading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    textAlign: 'center'
  },
  mapLoadingMessage: {
    fontStyle: 'italic',
  }
};

/*
 * Render the App component
 */
class App extends Component {

  state = {
    drawerOpen: false,
    map: {},
    infowindow: {},
    bounds: {},
    mapReady: false,
    mapCenter : { lat: 40.4506, lng: -79.9909 },
    mapError: false,
  
  };

  /*
   * Load google maps if the API succesfully loaded and the map is ready
   */
  componentWillReceiveProps({isScriptLoadSucceed}){

    // Check if script is loaded and if map is ready
    if (isScriptLoadSucceed && !this.state.mapReady ) {

      // create map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: this.state.mapCenter,
        styles: mapStyles,
        fullscreenControl: false,
        mapTypeControl: false
      });

      // set up bounds and infowindow to use later
      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({maxWidth: 300});

      // set the state of the map and its parameters
      this.setState({
        map: map,
        infowindow: infowindow,
        bounds: bounds,
        mapReady: true,
      });

    // alert user if map request fails
    } else if ( !this.state.mapReady ) {
      console.log("Map did not load");
      this.setState({mapError: true});
    };
  };

  /**
   * toggles the drawer open/close
   */
  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  /**
   * renders the App Component
   * @param {bool} drawerOpen is the drawer open(true) or closed (false)
   * @param {object} map the map object
   * @param {object} infowindow the google maps infowindow
   * @param {object} bounds the google maps bounds parameter
   * @param {bool} mapReady is the map ready to be rendered
   * @param {object} mapCenter the latlng of area to center the map on
   * @param {bool} mapError was the map loaded correctly
   * @param {object} classes jss styles
   */
  render() {

    const { drawerOpen, map, infowindow, bounds, mapReady, mapCenter, mapError } = this.state;
    const { classes } = this.props

    return (
      <div className= {classes.app_container} role="main">
        <Header 
          handleDrawerToggle = { this.handleDrawerToggle }
          drawerOpen = {drawerOpen}
        />
        { /* render markers only when map has loaded */
          mapReady ?
          <MapDrawer
            map={map}
            infowindow={infowindow}
            bounds={bounds}
            mapCenter={mapCenter}
            handleDrawerToggle={this.handleDrawerToggle}
            drawerOpen={drawerOpen}
          />
          : <p>Foursquare is experiencing issues loading data. Please check your internet connection...</p>
        }
        <section id="gmaps" className={classes.gmap} >
          <div id='map' className={classes.map} role="application" />
          { /* Render this if there was an error loading the map */
          mapError ?
            <div className={ classes.mapError } role="alert">
              Google Maps did not load.  Please try again later...
            </div>
            : <div className={classes.mapLoading}>
                <h4 className={classes.mapLoadingMessage}>Map is loading...</h4>
             </div>
        }
        </section>
        <Footer />
      </div>
    );
  };
};

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles) (scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=AIzaSyCy1f9bmydEZICd8rIoZnHaN61AogQzeRE`]
)(App));
