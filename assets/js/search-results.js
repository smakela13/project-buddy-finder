// _________SECOND PAGE PETFINDER SCRIPT STARTS HERE___________

let apiKey = "mPLuBul6G12XM99wSZsV1LJj4B1RnvgKYo7qZThtAvoM6uNqun"; // put your key here
let secret = "uMuiXKqNHfLNcLsmyuEhA0P26uZrjhS5yzZpIH9Y"; // put your secret here
let token;
let testURL = "https://api.petfinder.com/v2/animals";


// GETTING TOKEN FROM PETFINDER
// This is the function to get the token from petfinder. It must start FIRST.

function getToken() {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => response.json())
        .then((data) => {
            console.log("Token response: ", data);
            if (data.access_token) {
                token = data.access_token;
                // function call #2: Calls to get zipcode from URL********** 
                getParZipcode();
            }
        });
}

// GETTING THE ZIPCODE FROM THE URL

function getParZipcode() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var parZipcode = document.location.search.split('=').pop();
    console.log(parZipcode);
    searchPetfinder(parZipcode);
  }

// SEARCHING PETFINDER WITH ZIPCODE AND TOKEN
// uses fetchToPetFinder... when making fetch calls to pet finder api, you have to use function fetchToPetFinder!

function searchPetfinder(zipcode) {
    
    if (token) {
        var petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations";
        
        if (zipcode) {
            petfinderOrganizationUrl = "https://api.petfinder.com/v2/organizations/?location=" + zipcode + "&distance=10&limit=5";
        }
        console.log(petfinderOrganizationUrl);

        // function call #4: Calls to initiate fetchToPetFinder function to fetch data with token**********
        fetchToPetFinder(petfinderOrganizationUrl, function (petfinderResult) {
            console.log(petfinderResult);

            if (petfinderResult.organizations.length===0) {
                alert("No results found!");
            } else {
                for (var i = 0; i < petfinderResult.organizations.length; i++) {
                    // function call #5: Calls to print the results **********
                    printPetfinderResults(petfinderResult.organizations[i]);
                }
            }
        });
    } else {
        alert(`We don't have a token`);
    }    
}

// make sure you have a token before using this, this is for pet finder api calls
function fetchToPetFinder(url, callback) {
    fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
        .then((data) => {
            // console.log(data);
            // your logic here should handle any pet finder api calls

            // OR
            callback(data);
        });
}


// PRINTING THE RESULTS FROM PETFINDER

function printPetfinderResults(resultOrg) {
    console.log(resultOrg);
    // new button container div element variable
    // #result-log will be changed
    var orgList = document.querySelector("#result-content");
    var resultBtn = document.createElement("button");

    resultBtn.classList.add("inset-y-0", "right-0", "flex", "items-center", "px-4", "text-white", "bg-blue-300");
    // resultBtn.value = resultOrg.name;
    resultBtn.textContent = resultOrg.name + " - " + resultOrg.address.city;
    orgList.appendChild(resultBtn);

    // this attribute "postcode" is to be used for Map API
    resultBtn.setAttribute("postcode", resultOrg.address.postcode);

    resultBtn.addEventListener("click", function (event) {

        // cardContainerEl.innerHTML = "";
        // activeCityNameEl.textContent = "";
        // activeCityIconEl.textContent = "";
        // activeCityNameEl.textContent = resultObj.name + " - " + resultObj.state;

        var postcode = event.target.getAttribute("postcode");
        // Will call map-code.
        printMap(postcode); 
        
        window.localStorage.setItem(resultOrg.name, JSON.stringify({
            name: resultOrg.name,
            city: resultOrg.address.city,
            postcode: resultOrg.address.postcode,
        }));
    });

}

// SHOWING THE MAP FOR THE PICKED SHELTER

function printMap(postcode) {
    console.log(postcode);

    var mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + postcode + ".json?access_token=pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg"

    console.log(mapUrl);

    fetch(mapUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            result = data;
            //get info from this data and plug into map
            console.log('sending this to leaflet: ', [data.features[0].center[1], data.features[0].center[0]]);
            // add a marker on the center
            var marker = L.marker([data.features[0].center[1], data.features[0].center[0]]).addTo(map);

            marker.bindPopup("<b>Hey Buddy Finder!</b><br>I am a popup.").openPopup();
            // add a circle
            var circle = L.circle([data.features[0].center[1], data.features[0].center[0]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
        })
}

// show the map with no info
var map = L.map("mapid").setView([0, 0], 13);
// add tile layer to map
L.tileLayer('https://api.mapbox.com/styles/v1/{mapId}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
        // attribution: data.attribution,
        maxZoom: 18,
        mapId: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGhvdjkyIiwiYSI6ImNrbWR4YWd1YTBwZW8ycGxqMGRsamExYTEifQ.QxnzTZyRh6mwlM20J1mseg'
    }).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

// console.log('about to build the map', postcode);




























// THIS STARTS EVERYTHING!
// function call #1 : to get the token from petfinder **********
getToken();

// example
// let queryURL = "https://api.petfinder.com/v2/organizations/?location=27516&distance=10&limit=5";


