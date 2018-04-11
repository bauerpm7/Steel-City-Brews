import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Place from './Place'
import List, { ListItem, ListItemText } from 'material-ui/List';

import Divider from 'material-ui/Divider';


const styles = {
  list: {
    width: 250,
  },
  breweryList:{
    overFlow: 'auto'
  }
};

class MapDrawer extends Component {

  state = {
    query:"",
    filteredPlaces: []
  }

  filterPlaces = (event) => {

    const { infowindow, places } = this.props;
    const query = event.target.value.toLowerCase();

    // update state so input box shows current query value
    this.setState({ query: query })

    // close infoWindow when filter runs
    infowindow.close();

    // filter list markers by name of location
    const filteredPlaces = places.filter((place) => {
      const match = place.name.toLowerCase().indexOf(query) > -1;
      // place.marker.setVisible(match);
      return match;
    })

    // sort array before updating state
    filteredPlaces.sort(this.sortName);

    this.setState({filteredPlaces: filteredPlaces })
  }

  render() {
    const { classes, drawerOpen, handleDrawerToggle, places } = this.props;
    const { query, filteredPlaces } = this.state
    console.log(places)
    return (
      <div>
        <Drawer
            open={ drawerOpen }
            onClose={ handleDrawerToggle }
          >
         <div className={classes.list}>
          <input type="text"
            placeholder="filter by name"
            value={ query }
            onChange={ this.filterPlaces }
            className="query"
            role="search"
            aria-labelledby="text filter"
            tabIndex={ drawerOpen ? '0' : '-1' }
          />
            <Divider />
            <List 
              component='nav'
              className={classes.breweryList}>
              { filteredPlaces.length > 0 ?
                filteredPlaces.map((place) => (
                      <Place
                        place = { place }
                        drawerOpen = { drawerOpen }
                        handleDrawerToggle = { handleDrawerToggle }
                      />
                    )
                  ):
                places.map((place) => (
                      <Place
                        place = { place }
                        drawerOpen = { drawerOpen }
                        handleDrawerToggle = { handleDrawerToggle }
                      />
                ) 
              )}
            </List>
          </div>
        </Drawer>
         
      </div>
    );
  }
}

MapDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  places: PropTypes.object.isRequired
};

export default withStyles(styles)(MapDrawer);
