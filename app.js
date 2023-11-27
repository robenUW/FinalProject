//set map options

var mylatlng = { lat:38.254564, lng: -.4907}
var mapOptions = {
    center: mylatlng,
    zoom:7,
    mapTypeId: google.maps.mapTypeId.sattelite
};


var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)
