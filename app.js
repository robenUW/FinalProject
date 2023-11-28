// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map; 
let service;
let temp_lat = '';
let temp_lng = '';
let infowindow;
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
  const mylocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: mylocation,
    zoom: 15,
  });

  const request = {
    query: "Crossfit Ascend",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;
