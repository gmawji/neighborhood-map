var map;
  function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 28.762241, lng: -81.318398},
        zoom: 15
    });
}