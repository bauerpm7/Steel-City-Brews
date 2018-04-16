import React, { Component } from 'react';
import Place from './Place';
import { getFSLocations, getFSDetails } from '../API/foursquare';
import noImage from '../images/no-image-available.png';
import fsButton from '../images/foursquare-button.png';
import beerIcon from '../images/beer_marker.svg';
import PropTypes from 'prop-types';
import { Drawer, List } from 'material-ui'
import { withStyles } from 'material-ui/styles'



const style = {
  listView: {
    maxWidth: 280,
  },
  breweryList: {
    overflow: 'auto',
    paddingLeft: 20,
    paddingRight: 20
  }, 
  query: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 5,
    width: 225,
    border: '2px solid #8e8e8e',
    borderRadius: ' 5px 5px',
    padding: 5
  }, 
  loadingFS: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    textAlign: 'center'
  },
  loadingFSMessage: {
    fontStyle: 'italic'
  }
}

class MapDrawer extends Component {


  state = {
    query: '',
    allPlaces: [],
    filteredPlaces: null,
    apiReturned: false
  }

  componentDidMount () {
    getFSLocations(this.props.mapCenter)
    .then( places => {
      this.setState({
        allPlaces: places,
        filteredPlaces: places,
        apiReturned: true
      });
      if(places) this.addMarkers(places)
    })
    .catch(error => this.setState({apiReturned: true}));
  }

  addMarkers (places) {
    const { map, bounds, infowindow, toggleList } = this.props;
    const self = this;

    places.forEach( (location) =>  {

      const position = {
        lat: location.location.lat,
        lng: location.location.lng
      }

      location.marker = new window.google.maps.Marker({
        position,
        map,
        title: location.name,
        id: location.id,
        icon: beerIcon
      });

      bounds.extend(position);

      location.marker.addListener('click', function() {
        const marker = this;

        // bounce marker three times then stop
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2100);

        // get venue details and display in infowindow
        getFSDetails(marker.id)
        .then(data => {
          const place = data.response.venue;

          // set up fallbacks in case data is incomplete

          const { canonicalUrl, bestPhoto, contact, location, categories, attributes, tips } = place; // destructuring
          marker.url = canonicalUrl ? canonicalUrl : 'https://foursquare.com/';
          marker.photo = bestPhoto ? `${bestPhoto.prefix}width100${bestPhoto.suffix}` // ES6 template literals
                    : noImage;
          marker.phone = contact && contact.formattedPhone ? contact.formattedPhone : '';
          marker.address = location.address;
          marker.category = categories.length > 0 ? categories[0].name : '';
          marker.price = attributes.groups[0].summary &&  attributes.groups[0].type === "price" ?
                          attributes.groups[0].summary : '';
          marker.tip = tips.count > 0 ? `"${tips.groups[0].items[0].text}"` : 'No tips available';

          // build infowindonw content
          marker.infoContent = `<div class="place">
                                  <img class="placePhoto" src=${marker.photo} alt="${marker.title}">
                                  <div class="placeMeta">
                                    <h2 class="placeTitle">${marker.title}</h2>
                                    <p class="placeData">${marker.category}</p>
                                    <p class="placePrice">${marker.price}</p>
                                    <p class="placeContact">${marker.address}</p>
                                    <a class="placePhone" href="tel:${marker.phone}">${marker.phone}</a>
                                  </div>
                                </div>
                                <p class="placeTip">${marker.tip}</p>
                                <a class="placeLink" href="${marker.url}" target="_blank">
                                  <span>Read more on </span>
                                  <img class="fsIcon" src="${fsButton}">
                                  <span>Foursquare</span>
                                </a>`

          // set content and open window after content has returned
          infowindow.setContent(marker.infoContent);
          infowindow.open(map, marker);

          // close list view in mobile if open so infowindow is not hidden by list
          if (self.props.listOpen) {
            toggleList()
          };
        })
        .catch(error =>  {
          marker.infoContent = `<div class="venueError"  role="alert">
                  <h3>Foursquare Venue Details request for ${marker.title} failed</h3>
                  <p>Try again later...</p>
                </div>`
          // set content and open window
          infowindow.setContent(marker.infoContent);
          infowindow.open(map, marker);

          // close list view in mobile if open so infowindow is not hidden by list
          if (self.props.listOpen) {
            toggleList()
          };
        });
      });
    });

    // size and center map
    map.fitBounds(bounds);
  }

  filterPlaces = (event) => {

    const { allPlaces } = this.state;
    const { infowindow } = this.props;
    const query = event.target.value.toLowerCase();

    // update state so input box shows current query value
    this.setState({ query: query })

    // close infoWindow when filter runs
    infowindow.close();

    // filter list markers by name of location
    const filteredPlaces = allPlaces.filter((place) => {
      const match = place.name.toLowerCase().indexOf(query) > -1;
      place.marker.setVisible(match);
      return match;
    })

    // sort array before updating state
    filteredPlaces.sort(this.sortName);

    this.setState({filteredPlaces: filteredPlaces })
  }

  showInfo = (place) => {
    // force marker click
    window.google.maps.event.trigger(place.marker,'click');
  }

  render() {

    const { apiReturned, filteredPlaces, query } = this.state;
    const { drawerOpen, handleDrawerToggle, classes } = this.props;

    // API request fails
    if(apiReturned && !filteredPlaces) {
      return <div> Foursquare API request failed. Please try again later.</div>

   // API request returns successfully
    } else if( apiReturned && filteredPlaces ){
      return (
         <Drawer
            open={ drawerOpen }
            onClose={ handleDrawerToggle }
          >
          <div className={classes.listView}>
            <input type="text"
              placeholder="filter by name"
              value={ query }
              onChange={ this.filterPlaces }
              className={ classes.query }
              role="search"
              aria-labelledby="text filter"
            />
            { apiReturned && filteredPlaces.length > 0 ?
            <List className={classes.breweryList}>
              {filteredPlaces.map((place, id) =>
                <Place
                  key={place.id}
                  place={place}
                  drawerOpen={drawerOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              )}
            </List>
            : <p className={classes.noMatches}>No places match filter</p>
            }
          </div>
        </Drawer>
      );

    // API request has not returned yet
    } else {
      return (
        <div className={classes.loadingFS}>
          <h4 className={classes.loadingMessage}>Loading Breweries and GastroPubs...</h4>
       </div>
     )
    }

  }
}

MapDrawer.propTypes = {
  map: PropTypes.object.isRequired,
  infowindow: PropTypes.object.isRequired,
  bounds: PropTypes.object.isRequired,
  mapCenter: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired
}

export default withStyles(style) (MapDrawer);
