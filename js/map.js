var map, locations, infoWindow, bounds

// Create a new blank array for all the listing markers.
var markers = [];

function myMap () {
    // Create styles array to spice up map.
    var styles = [
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b5cbe4"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#efefef"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#83a5b0"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bdcdd3"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e3eed3"
                }
            ]
        },
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 33
                }
            ]
        },
        {
            "featureType": "road"
        },
        {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "lightness": 20
                }
            ]
        }
    ];

    // Constructor creates a new map - only center and zoom are required.
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
    center: new google.maps.LatLng(51.5014878, -0.0191633),
    styles: styles,
    zoom: 15
    };
    map = new google.maps.Map(mapCanvas, mapOptions);

    // Locations we show by default, in this case my favorite locations!
    locations = [
        {
            title: 'Discovery Docks Apartments', location: {lat:51.501409, lng: -0.018823}, type:'Living Quarters'
        },
        {
            title: 'Nandos Restaurant', location: {lat:51.5023146, lng:-0.0187593}, type:'Restaurant'
        },
        {
            title: 'The Slug and Lettuce', location: {lat:51.5044416, lng:-0.0200729}, type:'Restaurant'
        },
        {
            title: 'Canary Wharf Tube Station', location: {lat:51.5034898, lng:-0.0185944}, type: 'Transit'
        },
        {
            title: 'One Canada Square', location: {lat:51.5049494, lng:-0.0194997}, type: 'Shopping'
        },
        {
            title: 'Hamleys', location: {lat:51.5128012, lng:-0.140113}, type:'Shopping'
        },
        {
            title: 'Burgeri', location: {lat:51.5142708, lng:-0.1396003}, type:'Restaurant'
        },
        {
            title: 'Bond Street Station', location: {lat:51.5139532, lng:-0.1495572}, type: 'Transit'
        }
    ];

    largeInfowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    // Loop through our locations array and create markers
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var type = locations[i].type;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            type: type,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + ' (' + marker.type + ')' + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
}