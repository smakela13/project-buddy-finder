var searchZip = document.querySelector("#zipcode");
var searchBtn = document.querySelector("#search-button");
var result;



function getZipCode(event) {
    event.preventDefault();
    var zipText = searchZip.value;

    var mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + zipText + ".json?access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw";

    console.log(mapUrl);

    fetch(mapUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            result = data;
        });

}


searchBtn.addEventListener("click", getZipCode);

{/* <a class="btn" href="URL goes in here">Submit</a> */ }
// fetch("https://api.mapbox.com/geocoding/v5/mapbox.postcode/+ziptxt+.json?access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw")



var map = L.map('map').setView([-78.94, 35.9], 15);
L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}',
    {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 17,
        minZoom: 9
    }).addTo(map);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw'
}).addTo(map);

var marker = L.marker([-78.94, 35.9]).addTo(map);
marker.bindPopup("<b>Hey Buddy Finder!</b><br>I am a popup.").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);