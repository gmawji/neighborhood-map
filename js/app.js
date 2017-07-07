var myMap = function(data) {
    var self = this;

    // Not an observable so filtering works
    this.title = data.title;

    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.type = ko.observable(data.type);

    this.visible = ko.observable(true);

    // Set InfoWindow and content
    // TODO: Streamline the content, shouldn't be here
    this.largeInfoWindow = new google.maps.InfoWindow(
            {content: '<div>' + '<h4 class="iw_title">' + data.title + '</h4>' + '<h5 class="iw_subtitle">' + data.type + '</h5>'}
        );

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
        if(this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    // Add Listener for marker click to open InfoWindow
    this.marker.addListener('click', function() {
        self.largeInfoWindow.open(map, this)
    });

    // Add Listener for marker to Animate once clicked
    this.marker.addListener('click', function() {
        if (self.marker.getAnimation() !== null) {
            self.marker.setAnimation(null);
        } else {
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });

    // Add Listener for InfoWindow to kill animation when closed
    this.largeInfoWindow.addListener('closeclick', function() {
        self.marker.setAnimation(null);
    });
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

    initialLocations.forEach(function(myLocationItem){
        self.myLocationList.push( new myMap(myLocationItem));
    });

    this.myLocationsFilter = ko.computed( function() {
        // Set filter input text to LowerCase to ensure it matches
        // no matter what case is entered
        var filter = self.searchOption().toLowerCase();
        if (!filter) {
            self.myLocationList().forEach(function(myLocationItem){
                myLocationItem.visible(true);
            });
            return self.myLocationList();
        } else {
            return ko.utils.arrayFilter(self.myLocationList(), function(myLocationItem) {
                var string = myLocationItem.title.toLowerCase();
                var result = (string.search(filter) >= 0);
                myLocationItem.visible(result);
                return result;
            });
        }
    }, self);
};

function startApp() {
    ko.applyBindings(new AppViewModel());
}