// search parameters needed
// var mymap = L.map('#mapid').setView([51.505, -0.09], 13);
// pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw
// leaflet api token

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);
// var map = L.map('mapid', {
//     center: [51.505, -0.09],
//     zoom: 13
// });
var map = L.map('mapid').setView([51.505, -0.09], 15);
// L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
//     {
//       attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
//       maxZoom: 17,
//       minZoom: 9
//     }).addTo(map);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbTd6eHoxNzEyeGwydXMzcWFybHp6MmgifQ.zZ3yEJs-XX_N5SZIPaiaBw'
    }).addTo(map);