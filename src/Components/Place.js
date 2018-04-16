import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui'
import { withStyles } from 'material-ui/styles'

/**
 * Jss styles
 * @type {Object}
 */
const styles = {
  listItem: {
    '& :hover': { 
      color: '#FFB81C'
    }
  }
}

class Place extends Component {

  /**
   * When a place in the list is clicked force the corresponing infowindow to open
   */
  showInfo = () => {
    window.google.maps.event.trigger(this.props.place.marker,'click');
  }

  /**
   * renders the Place component
   */
  render() {
    const { place, drawerOpen, handleDrawerToggle , classes} = this.props;

    return (
      <ListItem 
        className={classes.place}
      >
        <div
          onClick={() => {
            //when an item in the list is clicked close the drawer and call the 
            //showInfo function
            handleDrawerToggle();
            this.showInfo();
          }}
          onKeyPress={() => {
            //when a key is pressed on a highlighted list item close the drawer
            //and call the showInfo function
            handleDrawerToggle();
            this.showInfo();
          }}
          role="button"
          tabIndex={ drawerOpen ? '0' : '-1' }
          >
          <ListItemText 
            className = {classes.listItem}
            primary = {place.name}/>
        </div>
      </ListItem>
    );
  }
}

Place.propTypes = {
    classes: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  }

export default withStyles(styles) (Place);
