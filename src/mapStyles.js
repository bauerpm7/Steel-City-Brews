export const mapStyles = [
  {
    elementType: 'geometry', 
    stylers: [
      {color: '#191716'}
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {color: '#FAFAFA'}
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {color: '#191716'}
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      { visibility: 'off' },
    ]
  },
  {
    featureType: 'water',
    stylers : [
      { color: '#1A6DB2' }, 

    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      { visibility: 'on' },
      { color: '#152a26' }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { color: '#5D430B' },
      // { lightness: -60}
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {color: '#212a37'}
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#FFB81C' },
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#191716'}]
  },
  {
    featureType: 'road.highway', 
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#FFB81C'},
      // { lightness: -40 }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#191716' },
      // { lightness: -25 }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#FFB81C'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#191716'}]
  },
  

]