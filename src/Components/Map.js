import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'
import { mapStyles } from '../mapStyles'
import { getFSLocations, getFSDetails } from '../API/foursquare.js';
import noImage from '../images/no-image-available.png';
import MapDrawer from './MapDrawer'


const styles = theme => ({
  gmaps:{
    height: '100%',
  },
  map: {
    margins: 'auto',
    width: '100%',
    height: 'calc(100% - 230px)',
    overflow: 'none',
    position: 'absolute'
  }
})
let markers = [];

class PghMap extends Component {
  
  state = { 
    infowindow: {}, 
    map: {},
    places: []
  }

  componentDidMount() {
      window.initMap = this.initMap;
      loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCy1f9bmydEZICd8rIoZnHaN61AogQzeRE&callback=initMap');
      getFSLocations(this.props.mapCenter)
      .then(places => {
        this.setState({
          places: places
      })
        
      this.addMarkers(this.state.infowindow, places, this.state.map)

    })
  }


  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.props.mapCenter,
        zoom: 12, 
        styles: mapStyles,
        mapTypeControl: false,
        fullscreenControl: false
    });

    const bounds = new window.google.maps.LatLngBounds();
    let infowindow = new window.google.maps.InfoWindow({maxWidth: 250});
    
    this.setState({
      infowindow: infowindow,
      map: map,
      bounds: bounds
    })


  }


  addMarkers = ( places, map, infowindow )=> {
 
    this.state.places.forEach((place) => {
     
      const position = {
        lat: place.location.lat,
        lng: place.location.lng
      }

      // const defaultIcon = this.makeMarkerIcon('FFB81C');

      // const highlightedIcon = this.makeMarkerIcon('4353B3');

      place.marker = new window.google.maps.Marker({
        position,
        map,
        title: place.name,
        animation: window.google.maps.Animation.DROP,
        // icon: defaultIcon,
        id: place.id
      });
      place.marker.addListener('click', function() {

        const marker = this;

        getFSDetails(marker.id)
        .then(data => {
          const place = data.response.venue
          console.log(place)

          const { canonicalUrl, bestPhoto, contact, location, description } = place;
        marker.photo = bestPhoto ? `${bestPhoto.prefix}width100${bestPhoto.suffix}` // ES6 template literals
                    : noImage;
        marker.phone = contact.formattedPhone ? contact.formattedPhone : ""
        marker.address = location.address
        marker.description = description ? description : ""
        marker.infocontent = `<div class = 'infowindow'>
                                <img class= "photo" src=${marker.photo} alt=${marker.title} />
                                <div class = "data" >
                                  <h3 class = "name">${marker.title}</h3>
                                  <p class="phone">${marker.phone}</p>
                                  <p class = "address">${marker.address}</p>
                                </div>
                              </div>
                              <div>
                                <p>${ marker.description }</p>
                              </div>`
        infowindow.setContent(marker.infocontent)
        infowindow.open(map, marker);
        })
        
      })

      // place.marker.addListener('mouseover', function() {
      //   this.setIcon(highlightedIcon);
      // })

      // place.marker.addListener('mouseout', function() {
      //   this.setIcon(defaultIcon);
      // })
      
      markers.push(place.marker);
      this.showMarkers(map);
      // this.getLocations(location.title);
    });
  }

  

  showMarkers = (map) => {
    var bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    };
    map.fitBounds(bounds)
  }

  // makeMarkerIcon = (markerColor) => {
  //     let markerImage = new window.google.maps.MarkerImage(
  //       'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
  //       '|40|_|%E2%80%A2',
  //       new window.google.maps.Size(21, 34),
  //       new window.google.maps.Point(0, 0),
  //       new window.google.maps.Point(10, 34),
  //       new window.google.maps.Size(21, 34));
  //     return markerImage;
  // }


  render() {
    
    const { classes, drawerOpen, handleDrawerToggle } = this.props
    const { infowindow, places } = this.state
    return (
      <section className={classes.gmaps}>
        <MapDrawer
          places = { places }
          drawerOpen = { drawerOpen }
          handleDrawerToggle = { handleDrawerToggle }
          infowindow = { infowindow }
        />
        <div 
          className={classes.map}
          id="map" />
      </section>
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

