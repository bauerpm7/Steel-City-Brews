import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'

const styles = theme => ({
  map: {
    width: '100%',
    height: '100vh'
  }
})

class PghMap extends Component {
    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCy1f9bmydEZICd8rIoZnHaN61AogQzeRE&callback=initMap')
    }

    initMap = () => {
        let mapDiv = document.getElementById("map");
        new window.google.maps.Map(mapDiv, {
            center: { lat: 40.4506, lng: -79.9909  },
            zoom: 13
        });
    }

    render() {
      const { classes } = this.props
        return (
            <div className={classes.map} id="map"></div>
        )
    }
}

function loadJS(src) {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = () => {
        alert('can not load map, refresh it!')
    }
    ref.parentNode.insertBefore(script, ref);
}

PghMap.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PghMap);
