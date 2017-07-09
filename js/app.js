// Global Variables
var map, clientID, clientSecret;

var MyMap = function(data) {
    var self = this;

    // Not an observable so filtering works
    this.title = data.title;

    this.lat = data.lat;
    this.lng = data.lng;
    this.type = ko.observable(data.type);

    // Foursquare!
    this.phone = '';
    this.street = '';
    this.city = '';
    this.zip = '';
    this.country = '';
    this.category = '';

    this.cll = data.lat + "," + data.lng;

    this.visible = ko.observable(true);

    // Google Maps marker setup
    this.marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(data.lat, data.lng),
        title: data.title,
        type: data.type,
        animation: google.maps.Animation.DROP
    });

    // Show the markers
    this.showMarker = ko.computed(function() {
        if (this.visible() === true) {
            this.marker.setMap(map);
            // Add Listener for marker click to open InfoWindow
            this.marker.addListener('click', function () {
                self.populateInfoWindow(this, self.largeInfoWindow);
            });
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    // URL for Foursquare API
    var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' + this.lat +
        ',' + this.lng + '&client_id=' + clientID + '&client_secret=' +
        clientSecret + '&query=' + this.title + '&v=20170708' +
        '&m=foursquare';

    // Foursquare API - Console.log commented out after implementation
    $.getJSON(apiUrl).done(function(data) {
        // console.log('Success!');
        var response = data.response.venues[0];
        self.street = response.location.formattedAddress[0];
        // console.log(self.street);
        self.city = response.location.formattedAddress[1];
        // console.log(self.city);
        self.zip = response.location.formattedAddress[3];
        // console.log(self.zip);
        self.country = response.location.formattedAddress[4];
        // console.log(self.country);
        self.category = response.categories[0].shortName;
        // console.log(self.category);
    }).fail(function() {
        // Send alert
        alert(
            "There was an issue loading the Foursquare API. Please refresh your page to try again."
        );
    });

    // Set InfoWindow
    this.largeInfoWindow = new google.maps.InfoWindow();

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            console.log(infowindow.marker);

            self.htmlContent = '<div>' + '<h4 class="iw_title">' +
                data.title +
                '</h4>' + '<h5 class="iw_subtitle">(' + self.category +
                ')</h5>' + '<div>' +
                '<h6 class="iw_address_title"> Address: </h6>' +
                '<p class="iw_address">' + self.street + '</p>' +
                '<p class="iw_address">' + self.city + '</p>' +
                '<p class="iw_address">' + self.zip + '</p>' +
                '<p class="iw_address">' + self.country + '</p>' +
                '</div>' + '</div>';

            infowindow.setContent(self.htmlContent);

            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
                console.log(infowindow.marker);
            });
        }
    };

    this.bounce = function(i) {
        google.maps.event.trigger(self.marker, 'click');
    };

    // Add Listener for marker to Animate once clicked
    this.marker.addListener('click', function() {
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 2500);
    });

    // Add Listener for InfoWindow to kill animation when closed
    this.largeInfoWindow.addListener('closeclick', function() {
        self.marker.setAnimation(null);
    });

    this.googleError = function googleError() {
        alert('Oops. Google Maps did not load. Please refresh the page and try again!');
    };
};

function AppViewModel() {
    var self = this;

    this.searchOption = ko.observable("");
    this.myLocationList = ko.observableArray([]);

    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(51.4980479, -0.0105351),
        zoom: 15,
        styles: styles
    };
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(mapCanvas, mapOptions);

    // Foursquare API Client
    clientID = "2G4BOAVMDDTBVKZOU0WI0IBXSQOCMDTIOWZCKXS4XO1RAC0R";
    clientSecret = "3UZMRJ1XEB1WDHZROFUCCIGDJCFMWPVRG5J4FFDWVDNHEV4K";

    myLocations.forEach(function(myLocationItem) {
        self.myLocationList.push(new MyMap(myLocationItem));
    });

    this.myLocationsFilter = ko.computed(function() {
        // Set filter input text to LowerCase to ensure it matches
        // no matter what case is entered
        var filter = self.searchOption().toLowerCase();
        if (!filter) {
            self.myLocationList().forEach(function(myLocationItem) {
                myLocationItem.visible(true);
            });
            return self.myLocationList();
        } else {
            return ko.utils.arrayFilter(self.myLocationList(), function(
                myLocationItem) {
                var string = myLocationItem.title.toLowerCase();
                var result = (string.search(filter) >= 0);
                myLocationItem.visible(result);
                return result;
            });
        }
    }, self);
}

function startApp() {
    ko.applyBindings(new AppViewModel());
}