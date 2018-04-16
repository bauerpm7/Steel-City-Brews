import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Place extends Component {

  static propTypes = {
    place: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  }

  showInfo = () => {
    // force marker click
    window.google.maps.event.trigger(this.props.place.marker,'click');
  }

  render() {

    const { place, drawerOpen, handleDrawerToggle } = this.props;

    return (
      <li className="place">
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
          {place.name}
        </div>
      </li>
    );
  }
}

export default Place;
