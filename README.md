# Udacity FEND Neighborhood Map Project
This app is to demonstrate the ability to use a js framework (`knockout.js`) & Google Maps API.
The application was made as a the penultimate final project for Udacity's Front-End Nanodegree.

## Code
CSS - Two files make up the CSS files that are local. Bootstrap CSS is CDN based and not local, just easier to update as it is currently using **Bootstrap 4 Alpha**. CSS files that are included are:
- `bootstrap-vertical-menu.css` (CSS for the Nav Sidebar)
- `mapStyles.css` (Overwrites Bootstrap CSS for custom styling of app)

JS - There are quite a few here and I will try explain as best as possible without becoming too convoluted.
- `knockout-3.4.2.js` (Knockout framework)
- `app.js` (Main application file)
- `styles.js` (Contains the styles for the custom Google Maps look)
- `markers.js` (Contains myLocations to populate the map)

HTML - `Index.html` is where all the magic happens and all the data is binded.

## Features
A Google Maps implemenation that shows you the best places (in my opinion) to visit around Canary Wharf, UK.
The site is fully responsive and will run on your tiniest screens all the way to the largest screen you can think of.
You get a full screen Google Map, populated with my favorite locations, along with a sidebar with a list of the locations that can be clicked on and also filtered so you can nail down what you want without any other distractions.

## APIs
Google Maps API is used here to show the map and generate the markers etc.
Foursquare API is used to pull more information on my favorite locations and provide a more complete listing when you click on the marker and the infoWindow shows up.

## Installation
Clone or download this repo and simply open the index.html file and enjoy!
You can make modifications to the locations and add your own in the `js/markers.js` file.

## Live Example
You can find a live running site of this code [here](http://bit.ly/nmp-uda).