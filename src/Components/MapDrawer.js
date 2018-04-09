import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

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

  render() {
    const { classes, drawerOpen, handleDrawerToggle, places } = this.props;
    console.log(places)
    return (
      <div>
        <Drawer
            open={ drawerOpen }
            onClose={ handleDrawerToggle }
          >
         <div className={classes.list}>
            <List>List 1</List>
            <Divider />
            <List 
              component='nav'
              className={classes.breweryList}>
              {
                places.map((place) => (
                      <ListItem
                        key = {place.id}
                        onClick = { handleDrawerToggle }
                      >
                        <ListItemText primary={place.name} />
                      </ListItem>
                    )
                )
              }
            </List>
          </div>
        </Drawer>
         
      </div>
    );
  }
}

MapDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func,

};

export default withStyles(styles)(MapDrawer);
