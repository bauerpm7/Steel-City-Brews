import React, { Component } from 'react';
import Header from '../Components/Header'
import MapDrawer from '../Components/MapDrawer';
import PghMap from '../Components/Map'
import Footer from '../Components/Footer'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { getFSLocations } from '../API/foursquare.js';

const styles = theme => ({
  app_container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  }
})

class App extends Component {
 
  constructor(props){ 
    super(props);
    this.state = {
      drawerOpen: false,
      places: [],
      mapCenter : { lat: 40.4506, lng: -79.9909 },
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  };

  componentDidMount() {
    getFSLocations(this.state.mapCenter)
      .then(places => {
        this.setState({
          places: places
      })
    })
  }


  handleDrawerToggle = () => {
   
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { classes } = this.props
    const { drawerOpen, places, mapCenter } = this.state
    return (
      <div className={ classes.app_container }>
        <Header
          drawerOpen = {drawerOpen}
          handleDrawerToggle = {this.handleDrawerToggle}
        />
        <PghMap 
          places = { places }
          drawerOpen = {drawerOpen}
          handleDrawerToggle = {this.handleDrawerToggle}
        />
        <Footer />
      </div>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);
