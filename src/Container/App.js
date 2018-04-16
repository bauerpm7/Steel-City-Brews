import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { mapStyles } from '../mapStyles.js';
import MapDrawer from '../Components/MapDrawer';
import foursquare from '../images/foursquare.png';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { withStyles } from 'material-ui/styles'
import './App.css';


const styles = theme => ({
  
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
  }
})


class App extends Component {

  state = {
    drawerOpen: false,
    map: {},
    infowindow: {},
    bounds: {},
    mapReady: false,
    // for future use when add location search
    mapCenter : { lat: 40.4506, lng: -79.9909 },
    mapError: false,
  
  }


  componentWillReceiveProps({isScriptLoadSucceed}){

    // Check if script is loaded and if map is ready
    if (isScriptLoadSucceed && !this.state.mapReady ) {

      // create map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: this.state.mapCenter,
        styles: mapStyles
      });

      // set up bounds and infowindow to use later
      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({maxWidth: 300});

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
    }
  }

  handleDrawerToggle = () => {
    //toggle the state of the drawer
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };


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
          : <p>We are experiencing loading issues. Please check your internet connection</p>
        }
        <section id="gmaps" className="gmaps" >
          <div id='map' className={classes.map} role="application" />
          { mapError ?
            <div id="map-error" className="error" role="alert">
              Google Maps did not load.  Please try again later...
            </div>
            : <div className="loading-map">
                <h4 className="loading-message">Map is loading...</h4>
             </div>
        }
        </section>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles) (scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=AIzaSyCy1f9bmydEZICd8rIoZnHaN61AogQzeRE`]
)(App));
