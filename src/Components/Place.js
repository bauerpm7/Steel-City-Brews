import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';

class Place extends Component {

  showInfo = (place) => {
    // force marker click
    window.google.maps.event.trigger(this.props.place.marker,'click');
  }

  render() {

    const { place, drawerOpen, handleDrawerToggle } = this.props;

    return (
      <ListItem
        key = {place.id}
        onClick = {
          this.showInfo,
          handleDrawerToggle
        }
        onKeyPress={this.showInfo}
        role="button"
        tabIndex={ drawerOpen? '0' : '-1' }
        >
        <ListItemText primary={place.name} />
      </ListItem>
    );
  }
}

Place.propTypes = {
    place: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  }
export default Place;
