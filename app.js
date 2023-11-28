// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map; 
let service;
let temp_lat = '';
let temp_lng = '';
let infoWindow;
getLocation();


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    temp_lat = 51.507222; //set default lat value
    temp_lng = -0.1275; //set default lng value
  }
}

function showPosition(position) {
  temp_lat = position.coords.latitude;
  temp_lng = position.coords.longitude;
  initMap();
}


function initMap() {
  var location = {
    lat: temp_lat,
    lng: temp_lng
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15
  });
infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
      location: location,
      radius: 5000000000,
      keyword: ['gym']
    },
    callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  
  });}