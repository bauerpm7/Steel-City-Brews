import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'
import { mapStyles } from '../mapStyles'
import { locations } from '../locations.js'

const styles = theme => ({
  map: {
    width: '100%',
    height: '100vh'
  }
})
let markers = [];
class PghMap extends Component {

  componentDidMount() {
      window.initMap = this.initMap;
      loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCy1f9bmydEZICd8rIoZnHaN61AogQzeRE&callback=initMap')
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.4506, lng: -79.9909  },
        zoom: 12, 
        styles: mapStyles
    });

    let largeInfoWindow = new window.google.maps.InfoWindow();

    const defaultIcon = this.makeMarkerIcon('FFB81C');

    const highlightedIcon = this.makeMarkerIcon('4353B3');

    locations.forEach((location) => {
     
      var position = location.coordinates;
      var title = location.title;
      
      var marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        icon: defaultIcon
      });
      marker.addListener('click', function() {
        marker.infocontent = `<div class="place">
                              <p>${marker.title}</p>
                            </div>`
        largeInfoWindow.setContent(marker.infocontent)
        largeInfoWindow.open(map, marker);
      })

      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      })

      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      })
      
      markers.push(marker);
      this.showMarkers(map);
      
    })
  }


  showMarkers = (map) => {
    var bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds)
  }

  makeMarkerIcon = (markerColor) => {
      let markerImage = new window.google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new window.google.maps.Size(21, 34),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(10, 34),
        new window.google.maps.Size(21, 34));
      return markerImage;
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

