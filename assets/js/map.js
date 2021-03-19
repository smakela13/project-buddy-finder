var zipText = "";
var searchZip = document.querySelector("#zipcode");
var searchBtn = document.querySelector("#search-button");

var result;
//  APIkey = pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg;


function displayMap(event) {
    event.preventDefault();
    if (searchZip.value !== "") {
        zipText = searchZip.val().trim();
        getZipCode(zipText);
    }
}

function getZipCode(event) {
    event.preventDefault();
    var zipText = searchZip.value;
    console.log(zipText);
    var mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + zipText + ".json?access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg";

    console.log(mapUrl);

    fetch(mapUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            result = data;
            //get info from this data and plug into map
            console.log('sending this to leaflet: ', [data.features[0].center[1], data.features[0].center[0]]);

            // created a map, sets a view on it
            // var map = L.map('mapid').setView([data.features[0].center[1], data.features[0].center[0]], 13);
            // L.map('mapid').setView([data.features[0].center[1], data.features[0].center[0]], 13);

            // add tile layer to map
            // L.tileLayer('https://api.mapbox.com/styles/v1/{mapId}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            //     {
            //         attribution: data.attribution,
            //         maxZoom: 18,

            //         mapId: 'mapbox/streets-v11',
            //         tileSize: 512,
            //         zoomOffset: -1,
            //         accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg'
            //     }).addTo(map);

            // add a marker on the center
            var marker = L.marker([data.features[0].center[1], data.features[0].center[0]]).addTo(map);

            marker.bindPopup("<b>Hey Buddy Finder!</b><br>I am a popup.").openPopup();
            // add a circle
            var circle = L.circle([data.features[0].center[1], data.features[0].center[0]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 100
            }).addTo(map);

            // var popup = L.popup();

            // function onMapClick(e) {
            //     popup
            //         .setLatLng(e.latlng)
            //         .setContent("You clicked the map at " + e.latlng.toString())
            //         .openOn(map);
            // }
            // map.on('click', onMapClick);

        })


}

searchbtn.addEventListener("click", getzipcode);

{/* <a class="btn" href="URL goes in here">Submit</a> */ }
// fetch("https://api.mapbox.com/geocoding/v5/mapbox.postcode/+ziptxt+.json?access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw")


// show the map with no info
var map = L.map('mapid').setView([35.7796, -78.6382], 13);
// add tile layer to map
L.tileLayer('https://api.mapbox.com/styles/v1/{mapId}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: data.attribution,
    maxZoom: 18,
    mapId: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg',
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

console.log('about to build the map', ziptxt);

