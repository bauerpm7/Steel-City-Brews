export const Place = function(window, location, map){
  var self = this;
  this.position = location.coordinates;
  this.title = location.title;

  this.marker = new window.google.maps.Marker({
    position: self.position,
    animation: window.google.maps.Animation.DROP,
    title: self.title
  });

  this.setMarker = function (){
    self.marker.setMap(map);
  }
}