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

      const highlightedIcon = this.makeMarkerIcon('FFFF24');

      for (let i=0; i<locations.length; i++){
       
        var position = locations[i].coordinates;
        var title = locations[i].title;
        
        var marker = new window.google.maps.Marker({
          position: position,
          title: title,
          animation: window.google.maps.Animation.DROP,
          id: i,
          icon: defaultIcon
        });

        markers.push(marker);
        this.showMarkers(map);

        marker.addListener('click', function (){
          this.populateInfoWindow(map, this, largeInfoWindow)
        });
      }
    }

  populateInfoWindow (map, marker, infowindow) {
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;

      // infowindow.setContent('<div>' + marker.title + '</div>');
      
      infowindow.addListener('closeclick', function(){
        infowindow.marker = null;
      });

      infowindow.open(map, marker);
    }
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

