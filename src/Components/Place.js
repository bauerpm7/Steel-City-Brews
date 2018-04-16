import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = {
  listItem: {
    '& :hover': { 
      color: '#FFB81C'
    }
  }
}

class Place extends Component {

  showInfo = () => {
    // force marker click
    window.google.maps.event.trigger(this.props.place.marker,'click');
  }

  render() {

    const { place, drawerOpen, handleDrawerToggle , classes} = this.props;

    return (
      <ListItem 
        className={classes.place}
      >
        <div
          onClick={() => {
            handleDrawerToggle();
            this.showInfo();
          }}
          onKeyPress={() => {
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
